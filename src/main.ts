import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["POST", "GET", "PATCH", "DELETE"]
  })
  await app.listen(parseInt(process.env.APP_PORT));
}
bootstrap();
