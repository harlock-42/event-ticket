import { BeforeCreate, BeforeUpdate, Entity, OneToMany, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Base } from "./base.entity";
import { Event } from "./event.entity"
import { Ticket } from "./ticket.entity";
import bcrypt from 'bcrypt'

@Entity()
export class User extends Base {
	@Property({
        unique: true
    })
	username: string

    @OneToMany(() => Event, (event) => event.owner, {
        default: []
    })
    events: Event[]

    @OneToMany(() => Ticket, (ticket) => ticket.owner, {
        default: []
    })
    tickets: Ticket[]

    @Property()
    password: string

    @Property()
    salt: string

    @BeforeUpdate()
    @BeforeCreate()
    private async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt()
            this.salt = salt
            this.password = await bcrypt.hash(this.password, salt)
        }
    }

	constructor(username: string, password: string) {
		super()
		this.username = username
        this.password = password
	}

}