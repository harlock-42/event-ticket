import { Controller, Inject, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		@Inject(CACHE_MANAGER) private cacheService: Cache
	) {}

	async getAll() {
        return this.userService.getAll()
	}
}
