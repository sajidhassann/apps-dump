import { applyDecorators, Injectable, UseGuards } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  AuthorizationService,
  UserType,
} from '../../authorization/authorization.service';
import { Request } from 'express';
import { AuthorizerGuard } from '../guards/authorizer-guard';

@ValidatorConstraint({ name: 'IsUserValid', async: true })
@Injectable()
export class IsUserValidConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly authorizationService: AuthorizationService) {}

  async validate(request: Request) {
    const userID = await this.authorizationService.getUserIdentity({
      request,
      userType: UserType.ADMIN,
    });
    console.log('userID', userID);
    return userID != null;
  }
}

export function IsUserValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserValidConstraint,
    });
  };
}

export const IsAgent = () => applyDecorators(UseGuards(AuthorizerGuard));
