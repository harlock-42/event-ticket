import { Entity, PrimaryKey } from "@mikro-orm/core";
import { v4 } from 'uuid'

@Entity()
export class Base {
	@PrimaryKey()
	id: string = v4()

	@PrimaryKey()
	createdAt: Date = new Date()

	@PrimaryKey({
		onUpdate: () => new Date()
	})
	updatedAt: Date = new Date()
}