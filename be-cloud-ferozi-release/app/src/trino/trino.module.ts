import { Module } from '@nestjs/common';
import { TrinoService } from './trino/trino.service';
import { ConfigService } from '@nestjs/config';


@Module({})
export class TrinoModule {
  providers: [TrinoService];
  exports: [TrinoService];
  imports: [ConfigService];
}
