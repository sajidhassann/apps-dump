'use client';

import { Box, Button, Center, Flex, Text, Title } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@application/redux/hooks';
import { APPLICATION_NAME } from '@application/constants';
import Logo from '@application/components/core/Logo';
import { login } from '@application/application/redux/features/auth';

const Login: NextPage = () => {
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Head>
        <title>Login - {APPLICATION_NAME}</title>
      </Head>

      <Box
        h="100vh"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <Box>
            <Center>
              <Logo
                metadata={{
                  height: 45,
                  alt: 'logo',
                  target: 'internal',
                  rel: 'nofollow',
                  isNavElement: false,
                }}
              />
            </Center>

            <Title fw="normal" mt={5}>
              Welcome back!
            </Title>
            <Text fz="sm" ta="center" mt="sm">
              Sign-in to your account to continue
            </Text>
            <Box style={{ width: 140, marginInline: 'auto' }}>
              <Center>
                <Button
                  fullWidth
                  variant="outline"
                  color="dark"
                  mt="lg"
                  disabled={loading}
                  onClick={() => {
                    dispatch(login());
                  }}
                >
                  Sign in with &nbsp;
                  <Image
                    src="/assets/icons/google-icon.svg"
                    alt="Google Icon"
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
  );
};

export default Login;
