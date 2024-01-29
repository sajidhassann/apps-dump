import { UserRole } from '@application/constants/enums/user.role.enum'
import { Menu } from '@application/constants/menu'
import { useAppDispatch, useAppSelector } from '@application/redux/hooks'
import { logout } from '@application/redux/networkThunk/auth'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useState } from 'react'
import DefaultLayout from '../components/layout/DefaultLayout'
import { APP_VERSION, COPYRIGHT } from '../constants'
import { MenuItem } from '../constants/menu/types'
import { IAuthState } from '../redux/states/shared/auth/types'

type LayoutProviderProps = {
   children: ReactNode
}

export const LayoutProvider = (props: LayoutProviderProps) => {
   const { user }: IAuthState = useAppSelector((state) => state?.auth)
   const router = useRouter()
   const dispatch = useAppDispatch()

   const redirectTo = useCallback(
      (path: string) => {
         router?.replace(path)?.finally?.(() => Promise.resolve())
      },
      [router]
   )

   // WARNING: UNCOMMENT THIS CODE FOR RBAC
   // useEffect(() => {
   // 	redirectTo(policies[user?.role ?? UserRole.UNKNOWN]?.[0])
   // }, [user?.role])

   const logOut = useCallback(() => {
      dispatch(logout())
   }, [])

   const getMenu = useCallback((): MenuItem[] => {
      const role = user?.role ?? UserRole.UNKNOWN
      switch (role) {
         case UserRole.SUPER_ADMIN:
         case UserRole.ADMIN:
            return Menu.admin.main
         default:
            return []
      }
   }, [user?.role])

   const [isNavbarExpand, setIsNavbarExpand] = useState<boolean>(true)

   return (
      <DefaultLayout
         showHeader
         showSideBar
         data={{
            headerProps: {
               isNavbarExpand: isNavbarExpand,
               setIsNavbarExpand: setIsNavbarExpand,
               user: user,
            },
            navbarProps: {
               menu: getMenu(),
               logout: logOut,
               isNavbarExpand: isNavbarExpand,
               setIsNavbarExpand: setIsNavbarExpand,
            },
            footerProps: {
               copyright: COPYRIGHT,
               appName: APP_VERSION,
            },
         }}
      >
         {props.children}
      </DefaultLayout>
   )
}
