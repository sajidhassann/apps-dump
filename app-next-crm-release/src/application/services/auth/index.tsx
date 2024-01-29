import {Auth} from 'aws-amplify'
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth'
import {CognitoUser} from 'amazon-cognito-identity-js'
import {UserRole} from '@/application/constants/enums/user.role.enum'

enum CognitoGroups {
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
    DOUBT_SOLVER = 'DOUBT-SOLVER',
    SNIPER = 'SNIPER',
}


export class AuthUser {
    readonly id: string
    readonly email: string
    readonly fName?: string
    readonly lName?: string
    readonly photo?: string
    readonly role: UserRole

    constructor(user: CognitoUser) {
        const userData = AuthUser.getUserData(user)
        this.id = userData?.sub ?? ''
        this.fName = userData?.name ?? ''
        this.lName = userData?.['family_name'] ?? ''
        this.photo = userData?.['picture'] ?? ''
        this.email = userData?.email ?? ''

        const groups = AuthUser.getUserGroups(userData)

        if (process.env.NODE_ENV === 'production')
            this.role = AuthUser.getUserRole(groups)
        else
            this.role = UserRole.AGENT

    }

    private static getUserData(user: CognitoUser): any {
        return user.getSignInUserSession()?.getIdToken().payload
    }

    private static getUserGroups(userData: any): [string] {
        return userData?.['cognito:groups']
    }


    private static getUserRole(roles: [string]): UserRole {
        const userRoles = roles.map(role => role.toUpperCase())
        if (userRoles.includes(CognitoGroups.SUPER_ADMIN))
            return UserRole.SUPER_ADMIN

        return UserRole.UNKNOWN
    }

}

export class AuthManager {
    static shared = new AuthManager()
    private cognitoUser?: AuthUser

    private constructor() {
    }

    public static async getAccessToken(): Promise<string> {
        try {
            const session = await Auth.currentSession()
            return session.getAccessToken().getJwtToken()
        } catch (err) {
            console.log({err})
            return ''
        }
    }

    async getUser(): Promise<AuthUser> {
        if (this.cognitoUser != null || this.cognitoUser != undefined)
            return this.cognitoUser

        const cognitoUser = await Auth.currentAuthenticatedUser()
        const user = new AuthUser(cognitoUser)
        this.cognitoUser = user
        return user
    }

    logout(): Promise<any> {
        return Auth.signOut()
    }

    login(): Promise<any> {
        console.log("Entered LoggedIn Route")
        return Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})
    }


}
