import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/user.service";
import bcrypt from 'bcrypt'
import { SigninDto } from "./dto/signin.dto";
import { SignupDto } from "./dto/signup.dto";

@Injectable()
export default class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    /*
    ** Create a new User's instance in db and return a JWT Token
    */
    async signup({ username, password }: SignupDto) {
        try {
            const user = await this.userService.createOne(username, password)
            const payload = {
                sub: user.id,
                username: user.username
            }
            return {
                accessToken: await this.jwtService.signAsync(payload)
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(error.getResponse(), error.getStatus())
            } else {
                throw new HttpException('Internal Servor error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    /*
    ** Check if the user exist and if his password match.
    */
    async signin({ username, password }: SigninDto) {
        try {
            const user = await this.userService.getOne(username)
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                throw new HttpException('The password is invalid', HttpStatus.UNAUTHORIZED)
            }
            const payload = {
                sub: user.id,
                username: username
            }
            return {
                accessToken: await this.jwtService.signAsync(payload)
            }
        } catch (error) {
            if (error instanceof HttpException) throw new HttpException(error.getResponse(), error.getStatus())
        }
    }
}