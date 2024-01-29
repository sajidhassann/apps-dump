import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {
  AuthorizationService,
  UserType,
} from '../../authorization/authorization.service';

@Injectable()
export class AuthorizerGuard implements CanActivate {
  private readonly authorizationService: AuthorizationService;

  constructor() {
    this.authorizationService = new AuthorizationService();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const path = request.route?.path;
    console.log('Request: ', path);

    const user = UserType.ADMIN;

    const response = await this.authorizationService.getUserIdentity({
      request,
      userType: user,
    });
    request.body.agentID = response;
    return response != null && response != '';
  }
}
