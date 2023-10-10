import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Event } from "src/entities/event.entity";
import { Ticket } from "src/entities/ticket.entity";
import CreateEventDto from "src/events/dto/createEvent.dto";

@Injectable()
export default class TicketService {
    constructor(
        private readonly em: EntityManager
    ) {}

    /*
    ** Create {nbTickets} Ticket\'s instances
    */
    async createMany( count: number, event: Event): Promise<Ticket[]> {
        const newTickets: Ticket[] = Array.from({ length: count }).map(() => {
            return new Ticket(event)
        })
        await this.em.persistAndFlush(newTickets)
        return newTickets
    }
}