import { useAppSelector } from '@/application/redux/hooks'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store, { createReducer, restrictedReducers, RootState } from '../redux'
import { Enums } from '@/application/constants'
import { IAuthState } from '@/application/redux/states/shared/auth/types'

type StateProviderProps = {
    children: JSX.Element
}

//Manage States for each Tenant
const TenantStateProvider = (props: StateProviderProps) => {

    const [{ user }]: [IAuthState] = useAppSelector((state: RootState) => [state?.auth])


    useEffect(() => {
        store.replaceReducer(createReducer(restrictedReducers[user?.role ?? Enums.userRole.UNKNOWN]))
    }, [user?.role])

    return props.children


}

export const StateProvider
    = (props: StateProviderProps) => {
    return (
        <Provider store={store}>
            <TenantStateProvider>
                {props.children}
            </TenantStateProvider>
        </Provider>
    )
}