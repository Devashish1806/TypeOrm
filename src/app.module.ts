import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationConfig } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyApp } from './application/application.context';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: MyApp.dbConfig['type'],
      host: MyApp.dbConfig['host'],
      port: MyApp.dbConfig['port'],
      database: MyApp.dbConfig['database'],
      username: MyApp.dbConfig['username'],
      password: MyApp.dbConfig['password'],
      entities: [User],
      url: MyApp.dbConfig['url'],
      synchronize: true,
      useUnifiedTopology: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
