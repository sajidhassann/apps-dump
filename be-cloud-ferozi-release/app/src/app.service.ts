import { Injectable } from '@nestjs/common';
import { AppConfigService } from './app-config/app-config.service';
import { AppConfig } from './app-config/models/app.config';
import { FeroziService } from './ferozi/ferozi.service';

@Injectable()
export class AppService {
  constructor(
    private readonly appConfig: AppConfigService,
    private readonly feroziService: FeroziService,
  ) {}

  async getUserFerozis(userID: string) {
    return this.feroziService.spinUpFerozisForUser(userID);
  }

  getAppConfig(): AppConfig {
    return this.appConfig.getConfig();
  }

  getHello(): string {
    return 'Welcome from haazir!';
  }
}
