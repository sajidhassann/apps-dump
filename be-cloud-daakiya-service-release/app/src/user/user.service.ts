import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {
  }
  async getUsersWithTokens(){
    const users = await this.repository.getUsersWithTokens()
    return users.map(({userID})=>userID).filter(Boolean)
  }
  getUsersWithTokensCount(){
    return this.repository.getUsersWithTokensCount()
  }
}
