import {
   Group,
   MediaQuery,
   Navbar,
   Switch,
   Text,
   useMantineColorScheme,
   useMantineTheme,
} from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavbarControl from '../NavbarControl'
import { MenuItem } from '@application/constants/menu/types'
import { IconMoonStars, IconSun } from '@tabler/icons-react'

export interface NavbarPropTypes {
   isNavbarExpand: boolean
   setIsNavbarExpand: React.Dispatch<React.SetStateAction<boolean>>
   logout: () => void
   menu: MenuItem[]
}

export default function CustomNavbar(props: NavbarPropTypes): JSX.Element {
   const { isNavbarExpand, setIsNavbarExpand, logout, menu } = props

   const theme = useMantineTheme()
   const isDarkTheme = theme.colorScheme === 'dark'

   const { toggleColorScheme } = useMantineColorScheme()

   return (
      <MediaQuery smallerThan="sm" styles={{ top: 0 }}>
         <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={isNavbarExpand}
            width={{ lg: 220, sm: 150 }}
         >
            <Switch
               size="md"
               color={isDarkTheme ? 'gray' : 'dark'}
               checked={isDarkTheme}
               onLabel={
                  <IconSun
                     size="1rem"
                     stroke={2.5}
                     color={theme.colors.yellow[4]}
                  />
               }
               offLabel={
                  <IconMoonStars
                     size="1rem"
                     stroke={2.5}
                     color={theme.colors.blue[6]}
                  />
               }
               onClick={() => toggleColorScheme()}
            />
            <Navbar.Section mb="xl">
               <NavbarControl
                  isNavbarExpand={isNavbarExpand}
                  setIsNavbarExpand={setIsNavbarExpand}
               />
            </Navbar.Section>

            {menu?.map((navLink, index) => {
               return (
                  <Navbar.Section key={index} mb="md">
                     <Link
                        href={navLink.url}
                        passHref
                        className="flex items-center text-dark pointer"
                     >
                        <Group>
                           <Image
                              src={`/assets/icons/${navLink.icon}`}
                              alt="nav-icon"
                              height={20}
                              width={20}
                           />
                           <Text ml="sm" display="inline">
                              {' '}
                              {navLink.title}{' '}
                           </Text>
                        </Group>
                     </Link>
                  </Navbar.Section>
               )
            })}

            <Navbar.Section
               onClick={() => {
                  logout()
               }}
            >
               <Group className="flex items-center text-dark pointer">
                  <Image
                     src={'/assets/icons/nav-icon-logout.svg'}
                     alt="nav-icon"
                     height={20}
                     width={20}
                  />
                  <span className="ms-1 d-sm-inline ">&nbsp;Logout</span>
               </Group>
            </Navbar.Section>
         </Navbar>
      </MediaQuery>
   )
}
