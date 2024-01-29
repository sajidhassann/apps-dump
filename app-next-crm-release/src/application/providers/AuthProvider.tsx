import {useAppDispatch, useAppSelector} from '@/application/redux/hooks'
import {IAuthState} from '@/application/redux/states/shared/auth/types'
import {useRouter} from 'next/router'
import React, {useCallback, useEffect} from "react";
import {policies} from "@/application/constants/policies/access.control.policy";
import {UserRole} from "@/application/constants/enums/user.role.enum";
import {LoginStatus} from "@/application/constants/enums/login.status.enum";
import {loadUser} from '../redux/networkThunk/auth';
import {AppShell, Center, Loader} from "@mantine/core";

type AuthProviderProps = {
    children: React.ReactNode
}


export const AuthProvider = (props: AuthProviderProps) => {

    const router = useRouter()
    const {user, isLoggedIn}: IAuthState = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //
    //     if (LoginStatus.LOGGED_OUT) {
    //         setIsLoggedIn(LoginStatus.LOGGED_OUT)
    //         router.push('/login')
    //     }
    //
    //     // if (isLoggedIn === LoginStatus.LOGGED_IN) {
    //     //     router.push('/agent')
    //     // }
    //
    // }, [isLoggedIn])

    // //MARK- Access Control
    const getPolicyURL = useCallback((role: string): string[] => {
        return policies[role] ?? ['']
    }, [])

    const isAllowed = useCallback((path: string): boolean => {
        const role: string = user?.role ?? UserRole.UNKNOWN
        const urls = getPolicyURL(role)

        return !!urls?.find?.((url) => {
            return path?.startsWith?.(url)
        })

    }, [user?.role, getPolicyURL])


    const getRedirectPage = useCallback((): string => {
        const role: string = user?.role ?? UserRole.UNKNOWN

        const urls = getPolicyURL(role)
        return urls?.[0] ?? '/login'
    }, [user?.role, getPolicyURL])


    const checkAccess = (url: string) => {

        console.log({isLoggedIn})
        if (isLoggedIn == LoginStatus.UNKNOWN) {
            // console.log('Updating login status')
            // setIsLoggedIn(LoginStatus.LOGGED_OUT,)
            // redirectTo('/login')
            return
        }


        if (isLoggedIn == LoginStatus.LOGGED_OUT) {
            redirectTo('/login')
            return
        }
        if (!isAllowed(url)) {
            redirectTo(getRedirectPage())
            return
        }
    }

    //Check Access Control on Route Change
    useEffect(() => {
        router.events.on('routeChangeStart', (url) => {
            checkAccess(url)
        })

    }, [])

    //Check Access Control on Start
    useEffect(() => {
        checkAccess(window.location.pathname)
    }, [isLoggedIn])


    // Load User
    useEffect(() => {
        if (!(isLoggedIn === LoginStatus.UNKNOWN))
            return


        console.log({isLoggedIn})
        dispatch(loadUser())
    }, [isLoggedIn])

    const redirectTo = useCallback((path: string) => {
        router.replace(path).finally(() => Promise.resolve())
    }, [router])


    if (isLoggedIn === LoginStatus.UNKNOWN) {
        return (
            <AppShell>
                <Center style={{minHeight: '100vh'}}>
                    <p>Authenticating...</p>
                    <Loader/>
                </Center>
            </AppShell>
        )
    }

    return (
        <>{props.children}</>
    )

}