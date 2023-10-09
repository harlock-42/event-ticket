import { Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { Base } from "./base.entity";
import { User } from "./user.entity";
import { Ticket } from "./ticket.entity";

@Entity()
export class Event extends Base {
    @Property()
    name: string

    @Property()
    address: string

    @Property()
    dateEvent: Date

    @ManyToOne(() => User)
    owner: User

    @OneToMany(() => Ticket, (ticket) => ticket.event, {
        default: []
    })
    tickets: Ticket[]
}