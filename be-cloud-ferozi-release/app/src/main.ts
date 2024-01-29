import tracer from './tracing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  await tracer.start();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'https://experiments.maqsad.net',
      'https://dev.experiments.maqsad.net',
      'https://dev.app.haazir.maqsad.net',
      'https://app.haazir.maqsad.net',
    ],
  });

  await app.listen(3000);
}
bootstrap();
