import { Macro } from "@/application/models/macro/macro.model";

export enum LoadingState {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    RETRIEVE = 'RETRIEVE',
    DELETE = 'DELETE',
    NOT_LOADING = 'NOT_LOADING'
}


export interface IMacroState {
    macros: Macro[]
    showMacrosManager: boolean
    loading: LoadingState
}



export const defaultState: IMacroState = {
    macros: [],
    showMacrosManager: false,
    loading: LoadingState.NOT_LOADING
}
