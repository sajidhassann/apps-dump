import { APPLICATION_NAME } from '@/application/constants'
import { Box, Button, Center, Flex, Text, Title } from '@mantine/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { login } from '@/application/redux/networkThunk/auth'


const Login: NextPage = () => {

    const loading = useAppSelector((state) => state.auth.loading)
    const dispatch = useAppDispatch()

    return (
        <div>
            <Head>
                <title>Login - {APPLICATION_NAME}</title>
            </Head>

            <Box h={'100vh'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <Flex
                    gap="md"
                    justify='center'
                    align='center'
                    direction='column'
                    wrap="wrap"
                >
                    <Box>
                        <Image
                            alt="Logo"
                            src="/assets/svgs/logo.svg"
                            width={240}
                            height={100}
                        />
                        <Title fw={'normal'}>Welcome back!</Title>
                        <Text fz='sm' ta='center' mt={'sm'}>Sign-in to your account to continue</Text>
                        <Box style={{ width: 140 }} sx={{ marginInline: 'auto' }}>
                            <Center>
                                <Button
                                    fullWidth
                                    variant="outline"
                                    mt='lg'
                                    disabled={loading}
                                    onClick={() => {
                                        dispatch(login())
                                    }}
                                >
                                    Sign in with
                                    &nbsp;
                                    <Image
                                        src={'/assets/icons/google-icon.svg'}
                                        alt="nav-icon"
                                        height={15}
                                        width={15}
                                    />
                                </Button>
                            </Center>
                        </Box>
                    </Box>

                </Flex>
            </Box>
        </div>
    )
}

export default Login
