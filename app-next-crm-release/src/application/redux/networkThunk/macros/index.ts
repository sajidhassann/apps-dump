import { NetworkingManger } from '@/application/services/networking'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { MacrosThunkType } from './types'
import { Macro } from '@/application/models/macro/macro.model'

export const createMacro = createAsyncThunk(
    MacrosThunkType.createMacro,
    (macro: Macro) => {
        return NetworkingManger.macros.create.createMacro(macro)
    }
)

export const updateMacro = createAsyncThunk(
    MacrosThunkType.updateMacro,
    (macro: Macro) => {
        return NetworkingManger.macros.update.updateMacro(macro)
    }
)

export const deleteMacro = createAsyncThunk(
    MacrosThunkType.deleteMacro,
    (id: string) => {
        return NetworkingManger.macros.delete.deleteMacro(id)
    }
)

export const getMacros = createAsyncThunk(
    MacrosThunkType.getMacros,
    () => {
        return NetworkingManger.macros.retrieve.getMacros()
    }
)
