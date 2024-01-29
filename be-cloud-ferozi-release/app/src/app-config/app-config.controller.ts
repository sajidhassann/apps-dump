import { Controller, Get, Query } from '@nestjs/common';
import { GetResDto } from './dto/get.res.dto';
import { GetReqDto } from './dto/get.req.dto';
import { AppConfigService } from './app-config.service';

@Controller('app/config')
export class AppConfigController {
  constructor(private readonly service: AppConfigService) { }
  @Get()
  async getConfig(@Query() req: GetReqDto): Promise<GetResDto> {
    const config = await this.service.getConfig();
    return { config: config.configs };
  }
}
