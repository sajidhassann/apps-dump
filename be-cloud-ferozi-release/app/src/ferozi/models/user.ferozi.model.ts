import { UserFeroziEntity } from '../repository/models/user.ferozi.entity';
import { Ferozi } from './ferozi.model';

export enum UserFeroziStatus {
  CONTROL = 'CONTROL',
  TREATMENT = 'TREATMENT',
  SAMPLE = 'SAMPLE',
  DISCARD = 'DISCARD',
}

export class UserFerozi {
  feroziID: string;
  userID: string;
  acknowledged: boolean;

  status: UserFeroziStatus;
  ferozi?: Ferozi;

  constructor(
    feroziID: string,
    userID: string,
    status: UserFeroziStatus,
    acknowledged: boolean,
    ferozi?: Ferozi,

  ) {
    this.feroziID = feroziID;
    this.userID = userID;
    this.status = status;
    this.ferozi = ferozi;
    this.acknowledged = acknowledged;
  }

  updateFerozi() {
    if (!this.ferozi) {
      throw new Error('Ferozi not set');
    }
    const random = Math.random() * 100;
    this.status =
      random <= this.ferozi.passPercentage
        ? UserFeroziStatus.TREATMENT
        : UserFeroziStatus.CONTROL;
  }

  static fromModel(model: UserFeroziEntity): UserFerozi {
    let status = UserFeroziStatus.SAMPLE;
    if (model.status == UserFeroziStatus.TREATMENT) {
      status = UserFeroziStatus.TREATMENT;
    }

    if (model.status == UserFeroziStatus.CONTROL) {
      status = UserFeroziStatus.CONTROL;
    }

    return new UserFerozi(
      model.feroziID,
      model.userID,
      status,
      model.acknowledged,
      Ferozi.fromModel(model.ferozi),
    );
  }
}
