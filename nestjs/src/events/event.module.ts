import { Module } from "@nestjs/common";
import EventController from "./event.controller";
import EventService from "./event.service";
import TicketModule from "src/tickets/ticket.module";

@Module({
    imports: [
        TicketModule
    ],
    providers: [
        EventService
    ],
    controllers: [
        EventController
    ],
    exports: []
})
export default class EventModule {}