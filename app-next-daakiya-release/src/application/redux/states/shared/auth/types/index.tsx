import { User } from '@application/models/shared/user.model'

export enum LoginStatus {
   LOGGED_IN,
   LOGGED_OUT,
   UNKNOWN,
}

export enum OnlineStatus {
   ONLINE = 'ONLINE',
   OFFLINE = 'OFFLINE',
}

export interface IAuthState {
   isLoggedIn: LoginStatus
   user?: User
   loading: boolean
}

export const defaultState: IAuthState = {
   isLoggedIn: LoginStatus.UNKNOWN,
   user: undefined,
   loading: false,
}
