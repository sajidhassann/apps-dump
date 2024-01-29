import { LoginStatus } from '@/application/constants/enums/login.status.enum'
import { UserRole } from '@/application/constants/enums/user.role.enum'
import { User } from '@/application/models/shared/user.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit' //next js redux toolkit
import { loadUser, login, logout } from '../../../networkThunk/auth'
import { defaultState } from './types'

export const authSlice = createSlice({
	name: 'auth',
	initialState: defaultState,
	reducers: {
		setIsLoggedIn: (state, action: PayloadAction<LoginStatus>) => {
			console.log('action.payload', action.payload)
			state.isLoggedIn = action.payload
		},

		tempSetUser: (state, action: PayloadAction<{ email: string }>) => {
			state.user = new User({
				id: action.payload.email ?? Math.random(),
				email: action.payload.email ?? '',
				role: UserRole.AGENT,
			})

			localStorage.setItem('user', JSON.stringify(state.user))
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, () => {
			loadUser()
		})

		// TODO: Add type safety to state
		builder.addCase(loadUser.fulfilled, (state: any, action: PayloadAction<any>) => {
			const user = action?.payload?.user
			const isLoggedIn: LoginStatus = !user ? LoginStatus.LOGGED_OUT : LoginStatus.LOGGED_IN

			state.user = user
			state.isLoggedIn = isLoggedIn
		})

		builder.addCase(loadUser.rejected, (state: any) => {
			state.user = undefined
			state.isLoggedIn = LoginStatus.LOGGED_OUT
		})

		builder.addCase(logout.fulfilled, (state: any) => {

			state.user = undefined,
				state.isLoggedIn = LoginStatus.LOGGED_OUT
		})

	},
})

export const {
	setIsLoggedIn,
	tempSetUser
} = authSlice.actions
// case under reducers becomes an action 
export default authSlice.reducer 