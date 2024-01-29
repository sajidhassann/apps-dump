import { createSlice } from '@reduxjs/toolkit'
import { defaultState } from '@/application/redux/states/admin/cohort/types'



export const cohortSlice = createSlice({
    name: 'cohort',
    initialState: defaultState,
    reducers: {}
})


export default cohortSlice.reducer