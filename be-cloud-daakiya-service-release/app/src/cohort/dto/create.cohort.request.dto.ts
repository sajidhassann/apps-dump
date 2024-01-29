import { IsNotEmpty } from "class-validator";

export class CreateCohortRequestDTO {
    @IsNotEmpty()
    name: string;
}