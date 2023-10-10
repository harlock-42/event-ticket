import { Module } from "@nestjs/common";
import AuthService from "./auth.service";
import AuthController from "./auth.controller";
import { UserModule } from "src/users/user.module";
import { UserService } from "src/users/user.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guard/auth.guard";

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                global: true,
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRE')
                } 
            })
        })
    ],
    providers: [
        AuthService,
        UserService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ],

    controllers: [
        AuthController
    ]
})
export default class AuthModule {}