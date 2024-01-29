import {
  Avatar,
  Burger,
  Flex,
  Group,
  Image,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import React from 'react';
import { NavbarControlPropTypes } from '../NavbarControl';

interface UserHeaderData {
  readonly id: string;
  readonly fName: string;
  readonly lName: string;
  readonly photo: string;
  readonly email: string;
}

export interface HeaderPropTypes {
  user?: UserHeaderData;
  opened?: boolean;
  toggle?: () => void;
}

export default function CustomHeader(props: HeaderPropTypes): JSX.Element {
  const { user, opened, toggle } = props;

  const { colorScheme } = useMantineColorScheme();

  return (
    <Group justify="space-between" h="100%" px="md">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

      <Image
        src={
          colorScheme === 'dark' ? '/logo-white.png' : '/logo-no-margins.png'
        }
        alt="maqsad-log"
        height={22}
        width={78}
      />

      <Flex align="center">
        <Avatar
          mr="md"
          radius="xl"
          src={user?.photo ?? '/assets/imgs/image.png'}
          alt="user"
        />

        <Text className="self-center">
          {`${user?.email ?? 'padawan@maqsad.io'}`}
        </Text>
      </Flex>
    </Group>
  );
}
