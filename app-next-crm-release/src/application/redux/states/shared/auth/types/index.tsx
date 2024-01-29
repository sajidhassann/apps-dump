import {LoginStatus} from '@/application/constants/enums/login.status.enum'
import {User} from '../../../../../models/shared/user.model'


export interface IAuthState {
    isLoggedIn: LoginStatus
    user?: User
    loading: boolean
}

export const defaultState: IAuthState = {
    isLoggedIn: LoginStatus.UNKNOWN,
    loading: false,
}



