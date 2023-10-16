import { EntityManager } from '@mikro-orm/core';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Event } from 'src/entities/event.entity';
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
    ** Get one user by his username
    */
    async getOne(username: string, relations: any[] = []) {
        try {
            const user = await this.em.findOne(User, {
                username: username
            }, {
                populate: relations
            })
            if (!user) { 
                throw new HttpException(`${username} doen\'t match with any users`, HttpStatus.BAD_REQUEST)
            }
            return user
        } catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(error.getResponse(), error.getStatus())
            }
        }
    }

	/*
	** Create a new user instance.
    ** Ckeck if the username is not already used by another user.
	*/
	async createOne(username: string, password: string) {
        try {
            const check = await this.em.findOne(User, {
                username: username
            })
            if (check) {
                throw new HttpException(`${username} is already used by another user`, HttpStatus.BAD_REQUEST)
            }
            const newUser = new User(username, password)
            this.em.persist(newUser)
            this.em.flush()
            return newUser
        } catch (error) {
                if (error instanceof HttpException) {
                throw new HttpException(error.getResponse(), error.getStatus())
            }
        }
	}

    /*
    ** Add an event to the user
    */
    async addEvent(userId: string, event: Event) {
        const user = await this.em.findOne(User, userId)
        user.events = [...user.events, event] // assign event to the user owner
        await this.em.flush()
    }
}
