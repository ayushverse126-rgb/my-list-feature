import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './generics/gaurds/auth.userCreds.guard';
import { MyListModule } from './modules/myList/myList.module';
import { UsersModule } from './modules/users/users.module';
import { RedisModule } from './modules/redis/redis.module';
import { MongoModule } from './modules/database/mongoModule/mongo.module';

@Module({
  imports: [
    MyListModule,
    MongoModule,
    UsersModule,
    RedisModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SUPER_SECRET',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
