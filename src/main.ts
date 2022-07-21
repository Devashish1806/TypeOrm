import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyApp } from './application/application.context';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(MyApp.appConfig.port);
}
bootstrap();
