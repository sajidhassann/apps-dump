import { Center, Text } from '@mantine/core';

import { NextPage } from 'next';
import Head from 'next/head';
import { APPLICATION_NAME } from '../../constants';

const Home: NextPage = () => (
    <>
      <Head>
        <title>{APPLICATION_NAME}</title>
      </Head>
      <main>
        <Center style={{ minHeight: '100vh' }}>
          <Text>Admin Dashboard</Text>
        </Center>
      </main>
    </>
  );

export default Home;
