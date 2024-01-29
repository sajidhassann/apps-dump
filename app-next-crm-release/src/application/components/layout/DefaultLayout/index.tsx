import { AppShell } from '@mantine/core'
// import { NotificationsProvider } from '@mantine/notifications'
import { FooterPropTypes } from '../../core/Footer'
import CustomHeader, { HeaderPropTypes } from '../../core/Header'
import CustomNavbar, { NavbarPropTypes } from '../../core/Navbar'


type DefaultLayoutDataProps = {

	headerProps: HeaderPropTypes
	navbarProps: NavbarPropTypes
	footerProps: FooterPropTypes

}

export type DefaultLayoutProps = {
	children: React.ReactNode
	data: DefaultLayoutDataProps
	showHeader: boolean
	showSideBar: boolean
}

const DefaultLayout = (props: DefaultLayoutProps) => {
	const { children, data } = props
	const { navbarProps, headerProps, footerProps } = data

	return (
		<AppShell
			styles={(theme) => ({
				main: { backgroundColor: theme.colors.gray[0], },
			})}
			navbarOffsetBreakpoint="sm"
			padding='xs'
			pb={0}
			navbar={
				<CustomNavbar {...navbarProps}/>
			}

			// footer={
			// 	<CustomFooter {...footerProps}/>
			// }

			header={
				<CustomHeader {...headerProps}/>
			}
		>
			{children}
		</AppShell>
	)
}

export default DefaultLayout
