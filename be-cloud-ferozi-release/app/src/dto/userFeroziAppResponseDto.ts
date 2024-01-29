import { FeroziType } from '@prisma/client';
import {
  UserFerozi,
  UserFeroziStatus,
} from 'src/ferozi/models/user.ferozi.model';

export class UserFeroziAppResponseDTO {
  id: string;
  name: string;
  status: UserFeroziStatus;
  type: FeroziType;
  metaData: string;
  acknowledged: boolean;

  constructor(
    id: string,
    name: string,
    status: UserFeroziStatus,
    type: FeroziType,
    metaData: Object,
    acknowledged: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.type = type;
    this.metaData = JSON.stringify(metaData);
    this.acknowledged = acknowledged;
  }

  static fromModel(model: UserFerozi): UserFeroziAppResponseDTO {
    return new UserFeroziAppResponseDTO(
      model.feroziID,
      model.ferozi.name,
      model.status,
      model.ferozi.type,
      model.ferozi.metaData,
      model.acknowledged,
    );
  }
}
