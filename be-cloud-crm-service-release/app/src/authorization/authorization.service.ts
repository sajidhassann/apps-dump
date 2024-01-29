import { UnauthorizedException } from "@nestjs/common";
import { CognitoHelper } from "./cognito";

export enum UserType {
  ADMIN,
}
export class AuthorizationService {
  private readonly adminCognitoHelper: CognitoHelper;

  constructor() {
    const adminUserPool = process?.env?.ADMIN_USERPOOL;
    this.adminCognitoHelper = new CognitoHelper({ userPool: adminUserPool ?? '' });
  }

  async getUserIdentity(props: {
    request;
    userType: UserType;
  }): Promise<string> {
    const { request } = props;
    return this.handleAuthV1({
      request: request,
      cognito: this.getCognitoClient(),
    });
  }

  private getCognitoClient(): CognitoHelper {
    return this.adminCognitoHelper;
  }

  private async handleAuthV1(props: {
    request;
    cognito: CognitoHelper;
  }): Promise<string> {
    const { request, cognito } = props;
    const [bearer, token] = request.headers?.authorization?.split(' ') ?? []
    console.log('Request headers: ', request.headers);
    if (request.headers.authorization && bearer === "Bearer") {
      // Validate the token
      try {
        const response = await cognito.validate(token);
        console.log("response", response);
        return response.sub;
      } catch (err) {
        console.error(err)
        throw new UnauthorizedException("Unauthorized");
      }
    }
    throw new UnauthorizedException("No token provided");

  }
}
