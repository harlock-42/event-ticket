import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import CreateEventDto from "./dto/createEvent.dto";
import TicketService from "src/tickets/ticket.service";
import { User } from "src/entities/user.entity";
import { Event } from "src/entities/event.entity";
import { Ticket } from "src/entities/ticket.entity";
import { UserService } from "src/users/user.service";

@Injectable()
export default class EventService {
    constructor(
        private readonly em: EntityManager,
        private readonly userService: UserService
    ) {}

    /*
    ** Create a new Event's instance
    */
    async createOne({name, address, dateEvent, nbTickets}: CreateEventDto, username: string) {
        // const owner = this.em.getReference(User, userId)
        const owner = await this.userService.getOne(username)
        const newEvent = new Event(name, address, dateEvent, owner)
        const newTickets = Array.from({ length: nbTickets}).map(() => {
            return new Ticket(newEvent)
        })
        newEvent.tickets = newTickets
        this.em.persist(newEvent)
        owner.events = [...owner.events, newEvent]
        this.em.flush()
        return newEvent
    }

    /*
    ** Get number of ticket still available for an event
    */
    async countTickets(name: string): Promise<number> {
        const nbTickets = this.em.count(Ticket, {
            $and: [
                {owner: null},
                {
                    event: {
                        name: name
                    }
                }
            ]
        })
        return nbTickets
    }
}