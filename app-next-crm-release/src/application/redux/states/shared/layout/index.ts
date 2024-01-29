import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { defaultState } from './types'

export const layoutSlice = createSlice({
    name: 'layout',
    initialState: defaultState,
    reducers: {
        setShowContactProfile: (state, action: PayloadAction<boolean>) => {
           state.showContactProfile = action.payload
        },
    }
})

export const { setShowContactProfile } = layoutSlice.actions

export default layoutSlice.reducer 