import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmConfig } from './config/ormconfig';
import { TaskModule } from './task/task.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
      inject: [TypeOrmConfig],
    }),
    UserModule,
    AuthModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {  
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }
  ],
})
export class AppModule {}
