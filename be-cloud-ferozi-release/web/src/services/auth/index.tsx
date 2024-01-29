import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { UserRole } from '../../constants';

enum CognitoGroups {
   ADMIN = 'ADMIN',
   SUPER_ADMIN = 'SUPER_ADMIN',
}

export class AuthUser {
   readonly id: string;
   readonly email: string;
   readonly fName?: string;
   readonly lName?: string;
   readonly photo?: string;
   readonly role: UserRole;

   constructor(user: CognitoUser) {
      const userData = AuthUser.getUserData(user);
      console.log('userDATA: ', userData);
      this.id = userData?.sub ?? '';
      this.fName = userData?.name ?? '';
      this.lName = userData?.family_name ?? '';
      this.photo = userData?.picture ?? '';
      this.email = userData?.email ?? '';

      const groups = AuthUser.getUserGroups(userData);
      console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
      if (process.env.NODE_ENV === 'production') this.role = AuthUser.getUserRole(groups);
      else this.role = UserRole.ADMIN;
   }

   private static getUserData(user: CognitoUser): any {
      return user.getSignInUserSession()?.getIdToken().payload;
   }

   private static getUserGroups(userData: any): [string] {
      return userData?.['cognito:groups'];
   }

   private static getUserRole(roles: [string]): UserRole {
      const userRoles = roles.map((role) => role.toUpperCase());
      if (userRoles.includes(CognitoGroups.SUPER_ADMIN)) return UserRole.SUPER_ADMIN;
      if (userRoles.includes(CognitoGroups.ADMIN)) return UserRole.ADMIN;
      return UserRole.UNKNOWN;
   }
}

export class AuthManager {
   static shared = new AuthManager();
   private cognitoUser?: AuthUser;

   // eslint-disable-next-line @typescript-eslint/no-empty-function
   private constructor() {}

   async getUser(): Promise<AuthUser> {
      if (this.cognitoUser != null || this.cognitoUser != undefined) return this.cognitoUser;

      const cognitoUser = await Auth.currentAuthenticatedUser();
      const user = new AuthUser(cognitoUser);
      this.cognitoUser = user;
      return user;
   }

   public static async getAccessToken(): Promise<string> {
      try {
         const session = await Auth.currentSession();
         return session.getAccessToken().getJwtToken();
      } catch (err) {
         console.log({ err });
         return '';
      }
   }

   logout(): Promise<any> {
      return Auth.signOut();
   }

   login(): Promise<any> {
      return Auth.federatedSignIn({
         provider: CognitoHostedUIIdentityProvider.Google,
      });
   }
}
