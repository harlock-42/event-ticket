import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
	constructor(
		private readonly em: EntityManager,
	) {}

	/*
	** get all the users of the database
	*/
	async getAll() {
		const users: User[] = await this.em.find(User, {})
		return users
	}

	/*
	** Create a new user instance
	*/
	async createOne(username: string, password: string) {
		const newUser = new User(username, password)
		this.em.persist(newUser)
		this.em.flush()
		return newUser
	}
}
