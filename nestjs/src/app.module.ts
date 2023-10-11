import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CacheModule } from '@nestjs/cache-manager';
import { UserModule } from './users/user.module';
import * as redisStore from 'cache-manager-redis-store'
import { ConfigModule } from '@nestjs/config';
import { MikroOrmConfigService } from './mikro-orm-config/mikro-orm-config.service';
import AuthModule from './auth/auth.module';
import EventModule from './events/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true
    }),
    MikroOrmModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }),
    UserModule,
    AuthModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService, MikroOrmConfigService],
})
export class AppModule {}
