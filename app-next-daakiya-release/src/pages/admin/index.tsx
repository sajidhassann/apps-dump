// pages/admin/index.tsx

import { useAppSelector } from '@application/redux/hooks'
import { APPLICATION_NAME } from '@constants/index'
import { Center, Text } from '@mantine/core'
import { LayoutProvider } from '@application/providers/LayoutProvider'
import { IAuthState } from '@application/redux/states/shared/auth/types'
import { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
   const { user }: IAuthState = useAppSelector((state) => state.auth)

   return (
      <LayoutProvider>
         <Head>
            <title>{APPLICATION_NAME}</title>
         </Head>
         <main>
            <Center style={{ minHeight: '100vh' }}>
               <Text>Admin Dashboard</Text>
            </Center>
         </main>
      </LayoutProvider>
   )
}

export default Home
