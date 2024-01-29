import { Policies, UserRole } from '@application/constants'
import { AppDispatch, RootState } from '@application/redux'
import { loadUser } from '@application/redux/networkThunk/auth'
import { LoginStatus } from '@application/redux/states/shared/auth/types'
import { AppShell, Center, Loader, Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type AuthProviderProps = {
   children: any
}
export const AuthProvider = (props: AuthProviderProps) => {
   const { user, isLoggedIn } = useSelector((state: RootState) => state.auth)

   const dispatch = useDispatch<AppDispatch>()

   const router = useRouter()

   //MARK- Access Control
   const getRolePolicy = useCallback((role: string): { urls: string[] } => {
      const filteredPolicy = Policies.find((policy) => {
         return policy.role === role
      })

      return filteredPolicy ?? { urls: ['/'] }
   }, [])

   const isAllowed = useCallback(
      (path: string): boolean => {
         const role: string = user?.role ?? UserRole.UNKNOWN
         const policy = getRolePolicy(role)

         return (
            policy?.urls?.filter?.((url) => {
               return path?.startsWith(url)
            })?.length > 0
         )
      },
      [user?.role, getRolePolicy]
   )

   const getRedirectPage = useCallback((): string => {
      const role: string = user?.role ?? UserRole.UNKNOWN
      const policy = getRolePolicy(role)
      return `${policy.urls[0] ?? '/login'}`
   }, [user?.role, getRolePolicy])

   const checkAccess = (url: string) => {
      if (isLoggedIn == LoginStatus.UNKNOWN)
         // console.log('Updating login status')
         // setIsLoggedIn(LoginStatus.LOGGED_OUT,)
         // redirectTo('/login')

         return

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

   // Check Access Control on Start
   useEffect(() => {
      checkAccess(window.location.pathname)
   }, [isLoggedIn])

   //Load User
   useEffect(() => {
      if (!(isLoggedIn === LoginStatus.UNKNOWN)) return

      dispatch(loadUser())
   }, [dispatch, isLoggedIn])

   const redirectTo = useCallback(
      (path: string) => {
         router.replace(path).finally(() => Promise.resolve())
      },
      [router]
   )

   if (isLoggedIn === LoginStatus.UNKNOWN) {
      return (
         <AppShell>
            <Center style={{ minHeight: '100vh' }}>
               <Text fw={500}>Authenticating</Text>
               &nbsp; &nbsp;
               <Loader color="dark" size="sm" variant="dots" />
            </Center>
         </AppShell>
      )
   }

   return <>{props.children}</>
}
