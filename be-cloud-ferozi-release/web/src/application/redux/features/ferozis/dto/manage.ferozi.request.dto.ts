import { Ferozi } from "../models/ferozi";

export interface ManageFeroziRequestDto extends Omit<Ferozi, 'createdAt' | 'updatedAt'> {
 
}
