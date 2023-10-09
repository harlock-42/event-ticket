import { Entity, ManyToOne } from "@mikro-orm/core";
import { Base } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class Ticket extends Base {
    @ManyToOne(() => User)
    owner: User

    @ManyToOne(() => Event)
    event: Event
}