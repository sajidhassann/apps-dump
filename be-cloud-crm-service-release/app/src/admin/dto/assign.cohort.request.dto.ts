import { IsNotEmpty } from "class-validator";

export class AssignCohortRequestDto {

    @IsNotEmpty({ message: "agentID must not be empty." })
    agentID: string;

    @IsNotEmpty({ message: "cohortID must not be empty." })
    cohortID: string;
    
}