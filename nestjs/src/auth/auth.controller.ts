import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import AuthService from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "./guard/auth.guard";
import { Public } from "./decorator/isPublic.decorator";
import { CurrentUser } from "./decorator/CurrentUser.decorator";

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
    @Public()
    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return await this.authService.signup(signupDto.username, signupDto.password)
    }

    @ApiOperation({ summary: "Signin a user and return his JWT Token"})
    @ApiBody({
        type: SignupDto
    })
    @Public()
    @Post('signin')
    async signin(@Body() signupDto: SignupDto) {
        return this.authService.signin(signupDto.username, signupDto.password)
    }
}