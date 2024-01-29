import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthManager } from '../../../services/auth'
import { User } from '../../../models/shared/user.model'
import { AuthThunkType } from './types'

export const login = createAsyncThunk(AuthThunkType.login, async () => {
   try {
      await AuthManager.shared.login()
   } catch (err) {
      console.log({ err })
   }
})

export const loadUser = createAsyncThunk(AuthThunkType.loadUser, async () => {
   const user = await User.loadUser()
   await user.loadUserData()
   return { user }
   // dispatch({
   // 	type: AuthActions.LOAD_USER, payload: {user}
   // })
})

export const logout = createAsyncThunk(AuthThunkType.logout, async () => {
   await AuthManager.shared.logout()
})
