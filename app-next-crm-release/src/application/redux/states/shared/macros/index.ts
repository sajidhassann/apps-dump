import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoadingState, defaultState } from "./types";
import { createMacro, deleteMacro, getMacros, updateMacro } from "@/application/redux/networkThunk/macros";

export const macrosSlice = createSlice({
    name: 'macros',
    initialState: defaultState,
    reducers: {
        toggleMacrosManager: (state, action: PayloadAction<boolean>) => {
            console.log({ 'action.payload macros': action.payload })
            state.showMacrosManager = action.payload
        }
    },
    extraReducers: (builder) => {
        //CREATE
        builder.addCase(createMacro.fulfilled, (state, action) => {
            console.log({ 'action.payload': action.payload })
            state.macros.unshift(action.payload)
            state.loading = LoadingState.NOT_LOADING
        })
        builder.addCase(createMacro.rejected, (state, action) => {
            console.log({ 'action.payload': action.payload })
            state.loading = LoadingState.NOT_LOADING
        })
        builder.addCase(createMacro.pending, (state, action) => {
            console.log({ 'action.payload': action.payload })
            state.loading = LoadingState.CREATE
        })
        //UPDATE
        builder.addCase(updateMacro.fulfilled, (state, action) => {
            console.log({ 'action.payload': action.payload })
            state.loading = LoadingState.NOT_LOADING
            state.macros = state.macros.map((macro) => macro.id === action.payload.id ? action.payload : macro)
        })
        builder.addCase(updateMacro.rejected, (state, action) => {
            console.log({ 'action.payload': action.payload })
            state.loading = LoadingState.NOT_LOADING
        })

        builder.addCase(updateMacro.pending, (state, action) => {
            console.log({ 'action.payload': action.payload })
            state.loading = LoadingState.UPDATE
        })            
        //DELETE
        builder.addCase(deleteMacro.fulfilled, (state, action) => {
            console.log({ 'action.payload': action.payload })
            state.loading = LoadingState.NOT_LOADING
            state.macros = state.macros.filter((macro) => macro.id !== action.payload.id)
        })
        builder.addCase(deleteMacro.rejected, (state, action) => {
            console.log({ 'action.payload': action.payload })
            state.loading = LoadingState.NOT_LOADING
        })
        builder.addCase(deleteMacro.pending, (state, action) => {
            console.log({ 'action.payload': action.payload })
            state.loading = LoadingState.DELETE
        })   
        //RETRIEVE
        builder.addCase(getMacros.fulfilled, (state, action) => {
            console.log({ 'action.payload': action.payload })
            state.loading = LoadingState.NOT_LOADING
            state.macros = action.payload
        })
        builder.addCase(getMacros.rejected, (state, action) => {
            console.log({ 'action.payload': action.payload })
            state.loading = LoadingState.NOT_LOADING
        })
        builder.addCase(getMacros.pending, (state, action) => {
            console.log({ 'action.payload': action.payload })
            state.loading = LoadingState.RETRIEVE
        })  
    }
    })

export const { toggleMacrosManager } = macrosSlice.actions