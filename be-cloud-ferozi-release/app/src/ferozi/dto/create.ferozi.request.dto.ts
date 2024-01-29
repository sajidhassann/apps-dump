import { Ferozi, FeroziNature, FeroziType } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateFeroziRequestDTO {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    passPercentage: number;
    @IsNotEmpty()
    sqlQuery: string;
    @IsNotEmpty()
    isActive: boolean;
    @IsNotEmpty()
    maxCapacity: number;
    @IsNotEmpty()
    type: FeroziType;
    @IsNotEmpty()
    metaData: Object;
    @IsNotEmpty()
    nature: FeroziNature;
}

