'use client';

import { ReactNode, useCallback } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import DefaultLayout from '../components/layout/DefaultLayout';
import { APP_VERSION, COPYRIGHT } from '../constants';
import { MenuItem } from '../constants/menu/types';
import { IAuthState, logout } from '../application/redux/features/auth';
import { UserRole } from '../constants/enums/user.role.enum';
import { Menu } from '../constants/menu';

type LayoutProviderProps = {
  children: ReactNode;
};

export function LayoutProvider(props: LayoutProviderProps) {
  const { user }: IAuthState = useAppSelector((state) => state?.auth);
  const dispatch = useAppDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, []);

  const getMenu = useCallback((): MenuItem[] => {
    const role = user?.role ?? UserRole.UNKNOWN;
    switch (role) {
      case UserRole.SUPER_ADMIN:
      case UserRole.ADMIN:
        return Menu.admin.main;
      default:
        return [];
    }
  }, [user?.role]);

  const [opened, { toggle }] = useDisclosure();

  return (
    <DefaultLayout
      showHeader
      showSideBar
      data={{
        headerProps: {
          user,
        },
        navbarControlProps: {
          opened,
          toggle,
        },
        navbarProps: {
          menu: getMenu(),
          logout: logOut,
          opened,
          toggle,
        },
        footerProps: {
          copyright: COPYRIGHT,
          appName: APP_VERSION,
        },
      }}
    >
      {props.children}
    </DefaultLayout>
  );
}
