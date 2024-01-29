import { Enums } from '@application/constants'
import { authSlice } from '@application/redux/states/shared/auth/slice'
import {
  CombinedState,
  combineReducers,
  configureStore,
  Middleware,
} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { PushNotificationSlice } from './states/PushNotifications/slice'

const middleWares: Middleware[] = []

if ( process.env.NODE_ENV === 'development' ) 
	middleWares.push( logger )


export const defaultReducers = {
	auth: authSlice.reducer,
	pushNotification: PushNotificationSlice.reducer,
}

export const restrictedReducers: { [k: string]: unknown } = {
	[Enums.userRole.ADMIN || Enums.userRole.SUPER_ADMIN]: {
		auth: authSlice.reducer,
	},
	[Enums.userRole.UNKNOWN]: {},
}

const store = configureStore( {
	reducer: combineReducers( defaultReducers ),
	middleware: ( getMiddleware ) => {
		return getMiddleware( { serializableCheck: false } ).concat( middleWares )
	},
} )

export const createReducer = ( asyncReducers = {} ): CombinedState<object> => {
	return combineReducers( {
		...defaultReducers,
		...asyncReducers,
	} )
}

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
