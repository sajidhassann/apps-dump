import { ConfigModel } from '../models/config.model';

export class GetResDto {
  config: { [key: string]: ConfigModel };
}
