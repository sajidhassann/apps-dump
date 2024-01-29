import { FeroziNature, FeroziType } from "@prisma/client";

export class FeroziEntity{
  name: string;
  id?: string;
  passPercentage: number;
  sqlQuery: string;
  isActive: boolean;
  maxCapacity: number;
  metaData?: any;
  nature: FeroziNature;
  type: FeroziType;
}