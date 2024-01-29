// pages/index.tsx

import { useAppSelector } from '@application/redux/hooks'
import { APPLICATION_NAME } from '@constants/index'
import { AppShell, Flex, Loader, Text } from '@mantine/core'
import { IAuthState } from '@application/redux/states/shared/auth/types'
import { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
   const { user }: IAuthState = useAppSelector((state) => state.auth)
   const fname: string = user?.fName ?? 'Oye Bachay'

   return (
      <AppShell>
         <Head>
            <title>{APPLICATION_NAME}</title>
         </Head>

         <main style={{ position: 'relative' }}>
            {/* <LoadingOverlay visible overlayBlur={ 2 } /> */}
            {/* ...other content */}
            <Flex
               gap="md"
               justify="center"
               align="center"
               direction="column"
               wrap="wrap"
               sx={{
                  height: '100vh',
               }}
            >
               <Loader color="secondary" size="sm" variant="bars" />
               <Text ta="center">
                  {fname}! Tum se nahi ho ga
                  <br />
                  Bashir Bhai ko phone karo, foran
               </Text>
            </Flex>
         </main>
      </AppShell>
   )
}

export default Home
