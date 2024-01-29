import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserExperimentsRequestDto } from './dto/userExperimentsRequestDto';
import { UserExperimentsResponseDto } from './dto/userExperimentsResponseDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  async healthCheck() {
    return "Up and running"
  }

  @Get()
  async getDynamicConfig() {
    const config = await this.appService.getAppConfig();
    return new UserExperimentsResponseDto(config, []);
  }

  @Get(':userID')
  async getUserFeatures(
    @Param() req: UserExperimentsRequestDto,
  ): Promise<UserExperimentsResponseDto> {
    const config = await this.appService.getAppConfig();
    const userFeroizs = await this.appService.getUserFerozis(req.userID);
    return new UserExperimentsResponseDto(config, userFeroizs);
  }
}


