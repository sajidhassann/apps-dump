import { IAgent } from '../interfaces/agent.interface';
import { Role, Status } from '@prisma/client';

export class Agent {
  readonly id: string;
  fName: string;
  lName: string;
  email: string;
  number: string;
  role: Role;
  status: Status;

  constructor(data: IAgent) {
    this.id = data.id;
    this.fName = data.fName;
    this.lName = data.lName;
    this.email = data.email;
  }
}
