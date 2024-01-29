import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import { kafkaConfig } from './kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '10mb' }));
  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice(kafkaConfig);
  await app.startAllMicroservices();

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://daakiya.maqsad.net',
      'https://dev.daakiya.maqsad.net',
    ],
  });

  await app.listen(3000);
}
bootstrap();
