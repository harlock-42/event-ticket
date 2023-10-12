import { EntityManager } from "@mikro-orm/core";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import CreateEventDto from "./dto/createEvent.dto";
import { User } from "src/entities/user.entity";
import { Event } from "src/entities/event.entity";
import { Ticket } from "src/entities/ticket.entity";
import { UserService } from "src/users/user.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import SetEventPropertiesDto from "./dto/setEventProperties.dto";

@Injectable()
export default class EventService {
    constructor(
        private readonly em: EntityManager,
        private readonly userService: UserService,
        @Inject(CACHE_MANAGER) private cacheService: Cache
    ) {}

    /*
    ** Create a new Event's instance
    */
    async createOne({name, address, dateEvent, nbTickets}: CreateEventDto, userId: string) {
        const nameTrimed: string = name.trim()
        const checkEventName: Event | null = await this.em.findOne(Event, {
            name: nameTrimed
        })
        if (checkEventName) {
            throw new HttpException(`Event name ${nameTrimed} is already used by another event`, HttpStatus.CONFLICT)
        }
        const owner = this.em.getReference(User, userId) // get the user owner of the event
        const newEvent = new Event(nameTrimed, address.trim(), dateEvent, owner) // create the event
        const newTickets = Array.from({ length: nbTickets}).map(() => {
            return new Ticket(newEvent)
        }) // create tickets of the event
        newEvent.tickets = newTickets // assign tickets to the event
        this.em.persist(newEvent)
        this.userService.addEvent(owner.id, newEvent)
        this.em.flush() // save to database

        await this.cacheService.set(`nbTicketsEvent-${name}`, nbTickets, await this.timeToEvent(newEvent))
        return newEvent
    }

    /*
    ** Get number of ticket still available for an event.
    */
    async countTickets(eventName: string): Promise<number> {
        const eventNameTrimed: string = eventName.trim()
        const event: Event | null = await this.em.findOne(Event, {
            name: eventNameTrimed
        })
        if (!event) { // Check if the event exists
            throw new HttpException(`Event ${eventNameTrimed} doesn\'t exist`, HttpStatus.NOT_FOUND)
        }
        const dataCached: number = await this.cacheService.get<number>(`nbTicketsEvent-${eventNameTrimed}`)
        if (dataCached) {
            return dataCached // return the number of ticket available without request the database
        }
        const nbTickets: number = await this.em.count(Ticket, {
            $and: [
                { owner: null },
                {
                    event: {
                        name: eventNameTrimed
                    }
                }
            ]
        }) // get the number of ticket which don't have owner from an event
        return nbTickets
    }

    /*
    ** Book a ticket by a user.
    ** Check if the user doesn't have already a ticket for the event.
    ** Check if the event exist and if there is enough ticket available.
    */
    async bookOne(eventName: string, userid: string) {
        const eventNameTrimed: string = eventName
        const user = this.em.getReference(User, userid)
        const checkUserTicket: Ticket = await this.em.findOne(Ticket, {
            $and: [
                {
                    event: {
                        name: eventNameTrimed
                    },
                    owner: {
                        id: userid
                    }
                }
            ]
        }) // check if a user already have a ticket for the event
        if (checkUserTicket) {
            throw new HttpException('The user already have a ticket for the event', HttpStatus.UNAUTHORIZED)
        }
        const ticket: Ticket = await this.em.findOne(Ticket, {
            $and: [
                {
                    event: {
                        name: eventNameTrimed
                    }
                },
                { owner: null }
            ]
        }) // Look for a ticket of the event still available
        if (!ticket) { // check if there is at least one ticket available
            throw new HttpException(`Event ${eventNameTrimed} is already full or doens\'t exist`, HttpStatus.NOT_FOUND)
        }
        ticket.owner = user
        this.em.flush()
        const nbTicketsCached: number = await this.cacheService.get<number>(`nbTicketsEvent-${eventName}`)
        await this.cacheService.set(`nbTicketsEvent-${eventNameTrimed}`, nbTicketsCached as number - 1, await this.timeToEvent(eventName)) // remove one ticket to the cache
        return ticket
    }

    /*
    ** remove user's booking uppon an event.
    */
    async removeBooking(userId: string, eventName: string) {
        const eventNameTrimed: string = eventName.trim()
        const ticket = await this.em.findOne(Ticket, {
            $and: [
                {
                    event: {
                        name: eventNameTrimed
                    }
                },
                {
                    owner: {
                        id: userId
                    }
                }
            ]
        }) // find a ticket booked by the user for the event targeted
        if (!ticket) {
            throw new HttpException('The user didn\'t have ticket for this event', HttpStatus.NOT_FOUND)
        }
        ticket.owner = null
        this.em.flush()
        const nbTickets: number = await this.cacheService.get<number>(`nbTicketsEvent-${eventNameTrimed}`)
        await this.cacheService.set(`nbTicketsEvent-${eventName}`, nbTickets + 1, await this.timeToEvent(eventNameTrimed)) // add one ticket to ticket's counter in the cache
    }

    /*
    ** return the number of seconds left before an event
    */
    async timeToEvent(event: string | Event): Promise<number> {
        let eventDate: Date
        if (typeof event === 'string') {
            const eventEntity = await this.em.findOne(Event, {
                name: event.trim()
            })
            eventDate = eventEntity.dateEvent
        } else {
            eventDate = new Date(event.dateEvent)
        }
        return Math.round((eventDate.getTime() - new Date().getTime()) / 1000)
    }

    /*
    ** Set new properties to an event.
    ** It can set name, date and address of the event. This three parameters are optional
    */
    async setEventProperties({eventName, newName, newDate, newAddress}: SetEventPropertiesDto, userId: string): Promise<Event> {
        const eventNameTrimed: string = eventName.trim()
        
        // General checking
        const event: Event = await this.em.findOne(Event, {
            name: eventNameTrimed
        }, {
            populate: ['owner']
        })
        if (!event) { // Check if the event exist
            throw new HttpException(`Event ${eventNameTrimed} doens\'t exist`, HttpStatus.NOT_FOUND)
        }
        if (event.owner.id !== userId) { // Check if the user is the owner of the event
            throw new HttpException(`The user is not the owner of the event ${eventNameTrimed}`, HttpStatus.UNAUTHORIZED)
        }
        
        if (newName && newName != event.name) {
            const newNameTrimed: string = newName.trim()
            // Checking for the name
            const checkName: Event | null = await this.em.findOne(Event, {
                name: newNameTrimed
            })
            if (checkName) { // Check if the new name is already used by another event
                throw new HttpException(`Name ${newNameTrimed} is already used by another event`, HttpStatus.CONFLICT)
            }
            event.name = newNameTrimed // assignement of the new name
        }
        
        if (newDate) {
            // Checking for the date
            const newDateToAssign: Date = new Date(newDate)
            const checkNewDate: number = newDateToAssign.getTime() - new Date().getTime()
            if (checkNewDate < 0) { // Check if the new date is in the future and not in the past
                throw new HttpException('The new date cannot be before the current date', HttpStatus.NOT_ACCEPTABLE)
            }
            event.dateEvent = newDateToAssign
        }

        if (newAddress) {
            event.address = newAddress.trim()
        }
        this.em.flush()
        return event
    }
}