import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Add cors to allow all origins
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://saarif.maqsad.net',
      'https://dev.saarif.maqsad.net',
    ],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '200mb' }));
  app.use(urlencoded({ extended: true, limit: '200mb' }));
  await app.listen(3000);
}
bootstrap();
