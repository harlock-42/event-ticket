import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Base } from "./base.entity";
import { Event } from "./event.entity"
import { Ticket } from "./ticket.entity";

@Entity()
export class User extends Base {
	@Property()
	username: string

    @OneToMany(() => Event, (event) => event.owner, {
        default: []
    })
    events: Event[]

    @OneToMany(() => Ticket, (ticket) => ticket.owner, {
        default: []
    })
    tickets: Ticket[]

	constructor(username: string) {
		super()
		this.username = username
	}
}