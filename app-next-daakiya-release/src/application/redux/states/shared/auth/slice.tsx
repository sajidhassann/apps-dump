import { createSlice, PayloadAction } from '@reduxjs/toolkit' //next js redux toolkit
import { loadUser, login, logout } from '../../../networkThunk/auth'
import { defaultState, LoginStatus } from './types'

export const authSlice = createSlice({
   name: 'auth',

   initialState: defaultState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(login.fulfilled, () => {
         loadUser()
      })

      builder.addCase(
         loadUser.fulfilled,
         (state, action: PayloadAction<any>) => {
            const user = action?.payload?.user
            const isLoggedIn: LoginStatus = !user
               ? LoginStatus.LOGGED_OUT
               : LoginStatus.LOGGED_IN

            state.user = user
            state.isLoggedIn = isLoggedIn
         }
      )

      builder.addCase(loadUser.rejected, (state) => {
         state.user = undefined
         state.isLoggedIn = LoginStatus.LOGGED_OUT
      })

      builder.addCase(logout.fulfilled, (state) => {
         ;(state.user = undefined), (state.isLoggedIn = LoginStatus.LOGGED_OUT)
      })
   },
})
// case under reducers becomes an action
export default authSlice.reducer
