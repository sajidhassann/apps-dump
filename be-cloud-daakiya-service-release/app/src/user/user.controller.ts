import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {

  constructor(private readonly service: UserService) {
  }

  @Get("/list")
  getUsersWithTokens() {
    return this.service.getUsersWithTokens();
  }

  @Get("/count")
  getUsersWithTokensCount() {
    return this.service.getUsersWithTokensCount();
  }
}


