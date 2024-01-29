export interface Ferozi {
  id: string;
  name: string;
  passPercentage: number;
  sqlQuery: string;
  isActive: boolean;
  maxCapacity: number;
  createdAt: string;
  updatedAt: string;
  type: string;
  nature: string;
  metaData?: any;
}
