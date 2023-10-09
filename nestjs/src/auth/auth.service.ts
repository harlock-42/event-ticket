import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export default class AuthService {
    constructor(
        private readonly userService: UserService
    ) {}

    async signup(username: string, password: string) {
        const user = await this.userService.createOne(username, password)
        console.log(user)
    }
}