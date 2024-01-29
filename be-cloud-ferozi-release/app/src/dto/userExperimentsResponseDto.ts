import { AppConfig } from '../app-config/models/app.config';
import { UserFerozi } from 'src/ferozi/models/user.ferozi.model';
import { UserFeroziAppResponseDTO } from './userFeroziAppResponseDto';

export class UserExperimentsResponseDto {
  config: AppConfig;
  ferozis: Record<string, UserFeroziAppResponseDTO> = {};

  constructor(
    config: AppConfig,
    ferozis: UserFerozi[],
  ) {
    this.config = config;
    ferozis.forEach((ferozi) => {
      const model = UserFeroziAppResponseDTO.fromModel(ferozi);
      this.ferozis[model.name] = model
    });
    
  }
}


