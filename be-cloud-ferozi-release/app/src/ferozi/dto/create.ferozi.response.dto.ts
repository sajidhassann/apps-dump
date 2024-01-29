import { IsNotEmpty } from 'class-validator';
import { CreateFeroziRequestDTO } from './create.ferozi.request.dto';

export class CreateFeroziResponseDTO extends CreateFeroziRequestDTO {
    @IsNotEmpty()
    id: string;
    
    @IsNotEmpty()
    createdAt: Date;
    
    @IsNotEmpty()
    updatedAt: Date;

}

