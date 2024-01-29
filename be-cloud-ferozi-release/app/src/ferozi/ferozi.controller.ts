import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FeroziService } from './ferozi.service';
import { FeroziType } from '@prisma/client';
import { AddOrDeleteUserToFeroziRequestDto as AddUserToFeroziRequestDto } from './dto/add.user.to.ferozi.request.dto';
import { AcknowledgeUserFeroziRequestDto } from './dto/acknowledge.user.ferozi.request.dto';
import { DeleteFeroziRequestDTO } from './dto/delete.ferozi.request.dto';
import { AnalyticsService } from './analytics/analytics.service';
import { CreateFeroziRequestDTO } from './dto/create.ferozi.request.dto';

@Controller('ferozi')
export class FeroziController {
  constructor(
    private readonly feroziService: FeroziService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Post('create')
  async createFerozi(@Body() body: CreateFeroziRequestDTO) {
    return this.feroziService.createFerozi({
      name: body.name,
      isActive: body.isActive,
      passPercentage: body.passPercentage,
      sqlQuery: body.sqlQuery,
      maxCapacity: body.maxCapacity,
      type: body.type as FeroziType,
      metaData: body.metaData,
      nature: body.nature,
    });
  }

  @Get('list')
  async getActiveFerozi() {
    return this.feroziService.getAllFerozis();
  }

  @Get(':id')
  async getFerozi(@Param('id') id: string) {
    return await this.feroziService.getFerozi(id);
  }

  @Patch('update')
  async updateFerozi(@Body() body: CreateFeroziRequestDTO) {
    return this.feroziService.updateFerozi({
      ...body,
    });
  }

  @Post('user/add')
  async addUserToFerozi(@Body() body: AddUserToFeroziRequestDto) {
    return this.feroziService.addUserToFerozi(body.userID, body.feroziID);
  }

  @Post('user/discard')
  async discardUserFerozi(@Body() body: AddUserToFeroziRequestDto) {
    return this.feroziService.discardUserFerozi(body.userID, body.feroziID);
  }

  @Patch('user/acknowledge')
  async acknowledegeUserFerozi(@Body() body: AcknowledgeUserFeroziRequestDto) {
    return this.feroziService.acknowledgeUserFerozi(body.userID, body.feroziID);
  }

  @Delete('delete')
  async deleteFerozi(@Body() body: DeleteFeroziRequestDTO) {
    return this.feroziService.deleteFerozi(body.feroziID);
  }

  @Get('stats/:feroziID')
  async getFeroziStats(@Param('feroziID') feroziID: string) {
    return this.analyticsService.getFeroziStats(feroziID);
  }
}
