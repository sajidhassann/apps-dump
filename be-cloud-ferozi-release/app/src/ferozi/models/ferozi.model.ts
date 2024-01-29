import { FeroziNature, FeroziType } from '@prisma/client';
import { FeroziEntity } from '../repository/models/ferozi.entity';

export class Ferozi {
  id?: string;
  name: string;
  passPercentage: number;
  sqlQuery: string;
  isActive: boolean;
  nature: FeroziNature;
  maxCapacity: number;
  type: FeroziType;
  metaData?: any;

  constructor(
    id: string,
    name: string,
    passPercentage: number,
    sqlQuery: string,
    isActive: boolean,
    maxCapacity: number,
    type: string,
    nature: FeroziNature,
    metaData?: Object,
  ) {
    this.id = id;
    this.name = name;
    this.passPercentage = passPercentage;
    this.sqlQuery = sqlQuery;
    this.isActive = isActive;
    this.maxCapacity = maxCapacity;
    this.type = type as FeroziType;
    this.metaData = metaData ?? {};
    this.nature = nature;
  }

  static fromModel(model: FeroziEntity): Ferozi {
    return new Ferozi(
      model.id,
      model.name,
      model.passPercentage,
      model.sqlQuery,
      model.isActive,
      model.maxCapacity,
      model.type,
      model.nature,
      model.metaData,
    );
  }

  static fromJson(model: any): Ferozi {
    return new Ferozi(
      model.id,
      model.name,
      model.passPercentage,
      model.sqlQuery,
      model.isActive,
      model.maxCapacity,
      model.type,
      model.metaData,
      model.nature,
    );
  }
}
