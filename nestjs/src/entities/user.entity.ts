import { Entity, PrimaryKey } from "@mikro-orm/core";
import { Base } from "./base.entity";

@Entity()
export class User extends Base {
	@PrimaryKey()
	username: string

	constructor(username: string) {
		super()
		this.username = username
	}
}