import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { v4 } from 'uuid'

@Entity()
export class Base {
	@PrimaryKey()
	@Unique()
	id: string = v4()

	@Property()
	createdAt: Date = new Date()

	@Property({
		onUpdate: () => new Date()
	})
	updatedAt: Date = new Date()
}