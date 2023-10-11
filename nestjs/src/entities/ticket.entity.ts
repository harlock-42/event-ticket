import { Cascade, Entity, ManyToOne } from "@mikro-orm/core";
import { Base } from "./base.entity";
import { User } from "./user.entity";
import { Event } from "./event.entity";

@Entity()
export class Ticket extends Base {
    @ManyToOne(() => User, {
        nullable: true,
        cascade: [Cascade.PERSIST]
    })
    owner: User

    @ManyToOne(() => Event)
    event: Event

    constructor(event: Event) {
        super()
        this.event = event
    }
}