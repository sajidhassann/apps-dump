import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../../../models/shared/user.model'
import { AuthManager } from '../../../services/auth'
import { AuthThunkType } from './types'


export const login = createAsyncThunk(
    AuthThunkType.login,
    async () => {
        try {
            await AuthManager.shared.login()
        } catch (err) {
            console.log({ err })
        }
    }
)

export const loadUser = createAsyncThunk(
    AuthThunkType.loadUser,
    async () => {
        try {
            const user = await User.loadUser()
            await user.loadUserData()
            return { user }
            // dispatch({
            // 	type: AuthActions.LOAD_USER, payload: {user}
            // })
        } catch (error) {
            console.log('Auth Error',error)
            //dispatch({type: AuthActions.LOAD_USER, payload: undefined})
        }
    }
)

export const logout = createAsyncThunk(
    AuthThunkType.logout,
    async () => {
        await AuthManager.shared.logout()
    }
)
