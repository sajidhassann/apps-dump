import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { RegisterDeviceRequestDTO } from './dto/register.device.request.dto';
import { RegistrationService } from './registration.service';
import { RegisterDeviceResponseDTO } from './dto/register.device.response.dto';
import { AppLogger } from '../app.logger';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly logger: AppLogger,
    private readonly service: RegistrationService,
  ) { }

  @Post()
  async registerDevice(
    @Body() request: RegisterDeviceRequestDTO,
  ): Promise<RegisterDeviceResponseDTO> {
    try {
      await this.service.register({
        userID: request.userID === undefined ? null : request.userID,
        token: request.token,
      });
      return { sucess: true };
    } catch (exception) {
      this.logger.error(exception);
      throw new HttpException('Failed to register device', 500);
    }
  }
}
