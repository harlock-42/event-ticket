import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorator/isPublic.decorator";

/*
** Get the Jwt token in the request and check if the token match with the user
*/
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private readonly configService: ConfigService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // check if the decorator @Public() has been affected to the route
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (isPublic) {
            return true // If the decorator @Public() has affected, skip authentification
        }
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request) // get the token from the request
        if (!token) {
            throw new UnauthorizedException('The token is missing or is not of Bearer type')
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET')
            }) // check if the token match with user's token
            request['user'] = payload
        } catch (error) {
            throw new UnauthorizedException('The token doen\'t match with the user')
        }
        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}