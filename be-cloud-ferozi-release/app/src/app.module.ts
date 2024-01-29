import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppConfigModule } from './app-config/app-config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfiguration from './config/app.configuration';
import { StorageModule } from './storage/storage.module';
import { FeroziModule } from './ferozi/ferozi.module';
import { TrinoModule } from './trino/trino.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AppConfigModule,
    StorageModule,
    FeroziModule,
    TrinoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
