import { Enums } from '@/application/constants'
import { campaignBucketSlice } from '@/application/redux/states/agent/campaignBucket'
import { authSlice } from '@/application/redux/states/shared/auth'
import { CombinedState, combineReducers, configureStore, Middleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { ticketSlice } from './states/agent/ticket'
import { cohortSlice } from './states/admin/cohort'
import { layoutSlice } from './states/shared/layout'
import { macrosSlice } from './states/shared/macros'

const middleWares: Middleware[] = []

if (process.env.NODE_ENV === 'development') 
	middleWares.push(logger)



export const defaultReducers = {
	auth: authSlice.reducer,
	campaignBucket: campaignBucketSlice.reducer,
	ticket: ticketSlice.reducer,
	macro: macrosSlice.reducer,
	layout: layoutSlice.reducer,
	cohort: cohortSlice.reducer,
}

export const restrictedReducers: { [k: string]: any } = {
	[Enums.userRole.AGENT]: {
		auth: authSlice.reducer,
		campaignBucket: campaignBucketSlice.reducer // TODO: Remove this
	},
	[Enums.userRole.UNKNOWN]: {}
}

const store = configureStore({
	reducer: combineReducers(defaultReducers),
	middleware: (getMiddleware) => {
		return getMiddleware({ serializableCheck: false }).concat(middleWares)
	}
})

export const createReducer = (asyncReducers: any = {}): CombinedState<any> => {
	return combineReducers({
		...defaultReducers,
		...asyncReducers
	})
}


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store