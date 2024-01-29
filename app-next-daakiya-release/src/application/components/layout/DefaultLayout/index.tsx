import {
   AppShell,
   ColorScheme,
   ColorSchemeProvider,
   MantineProvider,
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import CustomFooter, {
   FooterPropTypes,
} from '@application/components/core/Footer'
import CustomHeader, {
   HeaderPropTypes,
} from '@application/components/core/Header'
import CustomNavbar, {
   NavbarPropTypes,
} from '@application/components/core/Navbar'
import { useHotkeys } from '@mantine/hooks'
import { ReactNode, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'

type DefaultLayoutDataProps = {
   headerProps: HeaderPropTypes
   navbarProps: NavbarPropTypes
   footerProps: FooterPropTypes
}

export type DefaultLayoutProps = {
   children: ReactNode
   data: DefaultLayoutDataProps
   showHeader?: boolean
   showSideBar?: boolean
}

const DefaultLayout = (props: DefaultLayoutProps) => {
   const { children, data } = props
   const { navbarProps, headerProps, footerProps } = data

   const [colorScheme, setColorScheme] = useState<ColorScheme>(
      getCookie('mantine-color-scheme') as ColorScheme
   )

   const toggleColorScheme = (value?: ColorScheme) => {
      const nextColorScheme =
         value || (colorScheme === 'dark' ? 'light' : 'dark')
      setColorScheme(nextColorScheme)
      setCookie('mantine-color-scheme', nextColorScheme, {
         maxAge: 60 * 60 * 24 * 30,
      })
   }

   useHotkeys([['mod+J', () => toggleColorScheme()]])

   return (
      <ColorSchemeProvider
         colorScheme={colorScheme}
         toggleColorScheme={toggleColorScheme}
      >
         <MantineProvider
            theme={{ colorScheme }}
            withGlobalStyles
            withNormalizeCSS
         >
            <AppShell
               styles={(theme) => ({
                  main: {
                     backgroundColor:
                        theme.colorScheme === 'dark'
                           ? theme.colors.dark[8]
                           : theme.colors.gray[0],
                  },
               })}
               navbarOffsetBreakpoint="sm"
               navbar={<CustomNavbar {...navbarProps} />}
               header={<CustomHeader {...headerProps} />}
               footer={<CustomFooter {...footerProps} />}
            >
               <Notifications />

               {children}
            </AppShell>
         </MantineProvider>
      </ColorSchemeProvider>
   )
}

export default DefaultLayout
