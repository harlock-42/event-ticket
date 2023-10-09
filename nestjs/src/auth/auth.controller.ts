import { Body, Controller, Get, Post } from "@nestjs/common";
import AuthService from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export default class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @ApiOperation({ summary: "Signup a new user and return his JWT Token"})
    @ApiBody({
        type: SignupDto
    })
    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return await this.authService.signup(signupDto.username, signupDto.password)
    }

    @Get()
    async hello() {
        return 'hello'
    }
}