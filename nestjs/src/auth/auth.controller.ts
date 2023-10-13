import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from "@nestjs/common";
import AuthService from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "./guard/auth.guard";
import { Public } from "./decorator/isPublic.decorator";
import { CurrentUser } from "./decorator/CurrentUser.decorator";
import { SigninDto } from "./dto/signin.dto";

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
        try {
            return await this.authService.signup(signupDto)
        } catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(error.getResponse(), error.getStatus())
            } else {
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @ApiOperation({ summary: "Signin a user and return his JWT Token"})
    @ApiBody({
        type: SigninDto
    })
    @Public()
    @Post('signin')
    async signin(@Body() signinDto: SigninDto) {
        try {
            return this.authService.signin(signinDto)
        } catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(error.getResponse(), error.getStatus())
            } else {
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }
}