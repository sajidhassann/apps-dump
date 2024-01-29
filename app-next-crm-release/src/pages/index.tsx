import { AppShell, Center, LoadingOverlay, } from '@mantine/core'
import { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
    return (
        <AppShell>
            <Head>
                <title>Maqsad CRM</title>
            </Head>

            <main style={{ position: 'relative' }}>
                <LoadingOverlay visible overlayBlur={2}/>
                {/* ...other content */}
                <Center style={{ minHeight: '100vh' }}>
                    Saarif
                </Center>
            </main>
        </AppShell>
    )
}

export default Home
