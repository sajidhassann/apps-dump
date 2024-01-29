import { Ferozi } from "src/ferozi/models/ferozi.model";
import { FeroziEntity } from "./ferozi.entity";
import { UserFeroziStatus } from "@prisma/client";
import { User } from "aws-sdk/clients/budgets";

export class UserFeroziEntity {
  feroziID: string;
  userID: string;
  status: UserFeroziStatus;
  acknowledged: boolean;
  ferozi?: FeroziEntity;

  constructor(
    id: string,
    userID: string,
    status: UserFeroziStatus,
    ferozi?: FeroziEntity,
    acknowledged?: boolean,
  ) {
    this.feroziID = id;
    this.userID = userID;
    this.status = status;
    this.ferozi = ferozi;
    this.acknowledged = acknowledged ?? false;
  }
}
