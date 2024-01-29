import { ConfigModel } from './config.model';

export class AppConfig {
  configs: { [key: string]: ConfigModel };

  constructor(configs: { [p: string]: ConfigModel }) {
    this.configs = configs;
  }
}
