import {
   Avatar,
   Flex,
   Header,
   Image,
   MediaQuery,
   Text,
   useMantineColorScheme,
} from '@mantine/core'
import React from 'react'
import NavbarControl, { NavbarControlPropTypes } from '../NavbarControl'
import Constants from '../../../constants'

interface UserHeaderData {
   readonly id: string
   readonly fName: string
   readonly lName: string
   readonly photo: string
   readonly email: string
}

export interface HeaderPropTypes extends NavbarControlPropTypes {
   user?: UserHeaderData
}

export default function CustomHeader(props: HeaderPropTypes): JSX.Element {
   const { user, isNavbarExpand, setIsNavbarExpand } = props

   const { colorScheme, toggleColorScheme } = useMantineColorScheme()

   return (
      <Header height={{ base: 66 }} p="md">
         {/* <div className='d-flex flex-nowrap justify-content-between h-100'> */}
         <div className="flex flex-row flex-nowrap justify-between h-100">
            {/* <div className='d-flex flex-nowrap'> */}
            <div className="flex flex-nowrap">
               <NavbarControl
                  isNavbarExpand={isNavbarExpand}
                  setIsNavbarExpand={setIsNavbarExpand}
               />
               <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                  <Image
                     src={
                        colorScheme === 'dark'
                           ? Constants.images.logo.maqsad.white
                           : Constants.images.logo.maqsad.noMargin
                     }
                     alt="maqsad-log"
                     height={22}
                     width={78}
                  />
               </MediaQuery>
            </div>

            {/* <div className='d-flex flex-nowrap'> */}
            <div className="flex flex-nowrap">
               <Avatar
                  mr="md"
                  radius="xl"
                  src={user?.photo ?? '/assets/imgs/image.png'}
                  alt="user"
               />

               <Text className="self-center">
                  {`${user?.email ?? 'padawan@maqsad.io'}`}
               </Text>
            </div>
         </div>
      </Header>
   )
}
