import { UserRole } from '@/application/constants/enums/user.role.enum'
import { Menu } from '@/application/constants/menu'
import { MenuItem } from '@/application/constants/menu/types'
import { policies } from '@/application/constants/policies/access.control.policy'
import { User } from '@/application/models/shared/user.model'
import { useAppDispatch } from '@/application/redux/hooks'
import { logout } from '@/application/redux/networkThunk/auth'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import DefaultLayout from '../components/layout/DefaultLayout'
import { APP_VERSION, COPYRIGHT, Enums } from '../constants'

type LayoutProviderProps = {
	children: ReactNode;
};

export const LayoutProvider = (props: LayoutProviderProps) => {
	//const { user }: IAuthState = useAppSelector((state) => state?.auth)
	const user = { role: Enums.userRole.AGENT } as User
	const router = useRouter()
	const dispatch = useAppDispatch()

	const redirectTo = useCallback(
		(path: string) => {
			router?.replace(path)?.finally?.(() => Promise.resolve())
		},
		[router]
	)

	console.log('Policies Roles = ', policies[user?.role ?? UserRole.UNKNOWN]?.[0], user)


	// WARNING: UNCOMMENT THIS CODE FOR RBAC 
	// useEffect(() => {
	// 	redirectTo(policies[user?.role ?? UserRole.UNKNOWN]?.[0])
	// }, [user?.role])

	const logOut = useCallback(() => {
		dispatch(logout())
	}, [])

	const getMenu = useCallback((): MenuItem[] => {
		const role = user?.role ?? Enums.userRole.UNKNOWN
		console.log('role :>> ', role)
		switch (role) {
		case Enums.userRole.SUPER_ADMIN:
			return Menu.admin.main
		case Enums.userRole.AGENT:
			return Menu.admin.main // TODO: return relevant menu
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
					setIsNavbarExpand: setIsNavbarExpand
				},
				navbarProps: {
					menu: getMenu(),
					logout: logOut,
					isNavbarExpand: isNavbarExpand,
					setIsNavbarExpand: setIsNavbarExpand
				},
				footerProps: {
					copyright: COPYRIGHT,
					appName: APP_VERSION
				},
			}}
		>
			{props.children}
		</DefaultLayout>
	)
}
