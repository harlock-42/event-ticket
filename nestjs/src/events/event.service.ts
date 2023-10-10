import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import CreateEventDto from "./dto/createEvent.dto";
import TicketService from "src/tickets/ticket.service";
import { User } from "src/entities/user.entity";
import { Event } from "src/entities/event.entity";
import { Ticket } from "src/entities/ticket.entity";

@Injectable()
export default class EventService {
    constructor(
        private readonly em: EntityManager,
        private readonly ticketService: TicketService
    ) {}

    /*
    ** Create a new Event's instance
    */
    async createOne({name, address, dateEvent, nbTickets}: CreateEventDto, userId: string) {
        const owner = this.em.getReference(User, userId)
        const newEvent = new Event(name, address, dateEvent, owner)
        const newTickets = Array.from({ length: nbTickets}).map(() => {
            return new Ticket(newEvent)
        })
        newEvent.tickets = newTickets
        this.em.persistAndFlush(newEvent)
        return newEvent
    }
}