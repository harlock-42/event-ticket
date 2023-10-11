import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import EventModule from 'src/events/event.module';

@Module({
    providers: [UserService],
    controllers: [UserController],
    exports: [
        UserService
    ]
})
export class UserModule {}
