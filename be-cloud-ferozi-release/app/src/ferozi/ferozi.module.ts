import { Module } from '@nestjs/common';
import { FeroziService } from './ferozi.service';
import { FeroziController } from './ferozi.controller';
import { RepositoryService } from './repository/repository.service';
import { ConsumerModule } from 'src/consumer/consumer.module';
import { TrinoModule } from 'src/trino/trino.module';
import { TrinoService } from 'src/trino/trino/trino.service';
import { PrismaService } from './prisma/prisma.service';
import { ProcessingService } from './processing/processing.service';
import { AnalyticsService } from './analytics/analytics.service';

@Module({
  controllers: [FeroziController],
  providers: [
    FeroziService,
    RepositoryService,
    TrinoService,
    PrismaService,
    ProcessingService,
    AnalyticsService,
  ],
  imports: [ConsumerModule, TrinoModule],
  exports: [FeroziService],
})
export class FeroziModule {}
