import { IsNotEmpty } from "class-validator/types/decorator/common/IsNotEmpty";



class UpdateFeroziDto {
  @IsNotEmpty()
  id: string;

  name: string;
  passPercentage: number;
  sqlQuery: string;
  isActive: boolean;
  maxCapacity: number;
  type: string;
  metaData: Object;
}