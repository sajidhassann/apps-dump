import { Injectable } from '@nestjs/common';
import { UserToken } from './models/user.token.model';
import { RegistrationRepository } from './repository/registration.repository';
import { Token } from '@prisma/client';

@Injectable()
export class RegistrationService {
  constructor(private readonly repositoryService: RegistrationRepository) { }
  
  async register(data: UserToken) {
    await this.repositoryService.registerToken(data);
  }

  async getTokensForUsers(userIDs: string[]): Promise<Token[]> {
    return await this.repositoryService.getTokensForUsers(userIDs);
  }
}
