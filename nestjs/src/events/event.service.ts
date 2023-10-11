import { EntityManager } from "@mikro-orm/core";
import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import CreateEventDto from "./dto/createEvent.dto";
import TicketService from "src/tickets/ticket.service";
import { User } from "src/entities/user.entity";
import { Event } from "src/entities/event.entity";
import { Ticket } from "src/entities/ticket.entity";
import { UserService } from "src/users/user.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { isInstance } from "class-validator";

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

        this.cacheService.set(`nbTicketsEvent-${name}`, nbTickets, 0)
        return newEvent
    }

    /*
    ** Get number of ticket still available for an event
    */
    async countTickets(name: string): Promise<number> {
        const dataCached = await this.cacheService.get(`nbTicketsEvent-${name}`)
        if (dataCached) {
            return dataCached as number // return the number of ticket available without request the database
        }
        const nbTickets = this.em.count(Ticket, {
            $and: [
                {owner: null},
                {
                    event: {
                        name: name
                    }
                }
            ]
        }) // get the number of ticket which don't have owner from an event
        return nbTickets
    }

    /*
    ** Book a ticket by a user.
    ** Check if the event exist and if there is enough ticket available.
    */
    async bookOne(eventName: string, userid: string) {
        try {
            const user = this.em.getReference(User, userid)
            const ticket = await this.em.findOne(Ticket, {
                $and: [
                    {
                        event: {
                            name: eventName
                        }
                    },
                    { owner: null }
                ]
            })
            if (!ticket) {
                throw new HttpException(`Event ${eventName} is already full or doens\'t exist`, HttpStatus.BAD_REQUEST)
            }
            ticket.owner = user
            this.em.flush()
            const nbTicketsCached = await this.cacheService.get(`nbTicketsEvent-${eventName}`)
            await this.cacheService.set(`nbTicketsEvent-${eventName}`, nbTicketsCached as number - 1, 0) // remove one ticket to the cache
            return ticket
        } catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(error.getResponse(), error.getStatus())
            }
        }
    }
}