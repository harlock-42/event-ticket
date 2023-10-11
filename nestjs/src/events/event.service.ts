import { EntityManager } from "@mikro-orm/core";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import CreateEventDto from "./dto/createEvent.dto";
import { User } from "src/entities/user.entity";
import { Event } from "src/entities/event.entity";
import { Ticket } from "src/entities/ticket.entity";
import { UserService } from "src/users/user.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

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
        const owner = this.em.getReference(User, userId) // get the user owner of the event
        const newEvent = new Event(name, address, dateEvent, owner) // create the event
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
        const dataCached = await this.cacheService.get(`nbTicketsEvent-${eventName}`)
        if (dataCached) {
            return dataCached as number // return the number of ticket available without request the database
        }
        const nbTickets = this.em.count(Ticket, {
            $and: [
                {owner: null},
                {
                    event: {
                        name: eventName
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
        try {
            const user = this.em.getReference(User, userid)
            const checkUserTicket = await this.em.findOne(Ticket, {
                $and: [
                    {
                        event: {
                            name: eventName
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
            const ticket = await this.em.findOne(Ticket, {
                $and: [
                    {
                        event: {
                            name: eventName
                        }
                    },
                    { owner: null }
                ]
            }) // Look for a ticket of the event still available
            if (!ticket) { // check there is at least one ticket available
                throw new HttpException(`Event ${eventName} is already full or doens\'t exist`, HttpStatus.NOT_FOUND)
            }
            ticket.owner = user
            this.em.flush()
            const nbTicketsCached = await this.cacheService.get(`nbTicketsEvent-${eventName}`)
            await this.cacheService.set(`nbTicketsEvent-${eventName}`, nbTicketsCached as number - 1, await this.timeToEvent(eventName)) // remove one ticket to the cache
            return ticket
        } catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(error.getResponse(), error.getStatus())
            }
        }
    }

    /*
    ** remove user's booking uppon an event.
    */
    async removeBooking(userId: string, eventName: string) {
        try {
            const ticket = await this.em.findOne(Ticket, {
                $and: [
                    {
                        event: {
                            name: eventName
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
            const nbTickets: number = await this.cacheService.get<number>(`nbTicketsEvent-${eventName}`)
            await this.cacheService.set(`nbTicketsEvent-${eventName}`, nbTickets + 1, await this.timeToEvent(eventName)) // add one ticket to ticket's counter in the cache
        } catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(error.getResponse(), error.getStatus())
            }
        }
    }

    /*
    ** return the number of seconds left before an event
    */
    async timeToEvent(event: string | Event) {
        let eventDate: Date
        if (typeof event === 'string') {
            const eventEntity = await this.em.findOne(Event, {
                name: event
            })
            eventDate = eventEntity.dateEvent
        } else {
            eventDate = new Date(event.dateEvent)
        }
        return Math.round((eventDate.getTime() - new Date().getTime()) / 1000)
    }
}