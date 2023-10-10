import { Cascade, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { Base } from "./base.entity";
import { User } from "./user.entity";
import { Ticket } from "./ticket.entity";

@Entity()
export class Event extends Base {
    @Property({
        unique: true
    })
    name: string

    @Property()
    address: string

    @Property()
    dateEvent: Date

    @ManyToOne(() => User)
    owner: User

    @OneToMany(() => Ticket, (ticket) => ticket.event, {
        default: [],
        cascade: [Cascade.ALL]
    })
    tickets: Ticket[]

    constructor(name: string, address: string, dateEvent: Date, owner: User) {
        super()
        this.name = name
        this.address = address
        this.dateEvent = dateEvent
        this.owner = owner
    }
}