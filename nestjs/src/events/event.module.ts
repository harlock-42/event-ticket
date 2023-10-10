import { Module } from "@nestjs/common";
import EventController from "./event.controller";
import EventService from "./event.service";
import TicketModule from "src/tickets/ticket.module";
import { UserModule } from "src/users/user.module";
import { UserService } from "src/users/user.service";

@Module({
    imports: [
        UserModule
    ],
    providers: [
        EventService,
        UserService
    ],
    controllers: [
        EventController
    ],
    exports: []
})
export default class EventModule {}