import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from '../config/app.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
      isGlobal: true,
    }),
  ],
  providers: [ConsumerService],
  exports: [ConsumerService],
})
export class ConsumerModule {}
