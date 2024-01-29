'use client';

import { AppShell, Flex, Loader, Text } from '@mantine/core';
import Head from 'next/head';
import { APPLICATION_NAME } from '../constants';
import { useAppSelector } from '../redux/hooks';
import { IAuthState } from '../application/redux/features/auth';

export default function HomePage() {
  const { user }: IAuthState = useAppSelector((state) => state.auth);
  const fname: string = user?.fName ?? 'Oye Bachay';

  return (
    <>
      <AppShell>
        <Head>
          <title>{APPLICATION_NAME}</title>
        </Head>
        <main style={{ position: 'relative' }}>
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
            style={{
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
    </>
  );
}
