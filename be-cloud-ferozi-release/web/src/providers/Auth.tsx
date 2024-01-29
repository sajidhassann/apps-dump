'use client';

import { Policies, UserRole } from '@application/constants';
import { AppDispatch, RootState } from '@application/redux';
import { AppShell, Center, Loader, Text } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, LoginStatus } from '../application/redux/features/auth';

type AuthProviderProps = {
  children: any;
};
export const AuthProvider = (props: AuthProviderProps) => {
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const pathname = usePathname();
  const routStart = pathname?.split('/')[1];

  //MARK- Access Control
  const getRolePolicy = useCallback((role: string): { urls: string[] } => {
    const filteredPolicy = Policies.find((policy) => policy.role === role);

    return filteredPolicy ?? { urls: ['/'] };
  }, []);

  const isAllowed = useCallback(
    (path: string): boolean => {
      const role: string = user?.role ?? UserRole.UNKNOWN;
      const policy = getRolePolicy(role);

      return policy?.urls?.filter?.((url) => path?.startsWith(url))?.length > 0;
    },
    [user?.role, getRolePolicy]
  );

  const getRedirectPage = useCallback((): string => {
    const role: string = user?.role ?? UserRole.UNKNOWN;
    const policy = getRolePolicy(role);
    return `${policy.urls[0] ?? '/login'}`;
  }, [user?.role, getRolePolicy]);

  const redirectTo = useCallback(
    (path: string) => {
      router.replace(path);
    },
    [router]
  );

  const checkAccess = (url: string) => {
    if (isLoggedIn === LoginStatus.UNKNOWN) return;

    if (isLoggedIn === LoginStatus.LOGGED_OUT) {
      console.log('dsassda in');

      redirectTo('/login');
      return;
    }
    if (!isAllowed(url)) {
      redirectTo(getRedirectPage());
    }
  };

  //Check Access Control on Route Change
  useEffect(() => {
    const url = window.location.pathname;
    checkAccess(url);
  }, [routStart]);

  // Check Access Control on Start
  useEffect(() => {
    checkAccess(window.location.pathname);
  }, [isLoggedIn]);

  //Load User
  useEffect(() => {
    if (!(isLoggedIn === LoginStatus.UNKNOWN)) return;

    dispatch(loadUser());
  }, [dispatch, isLoggedIn]);

  if (isLoggedIn === LoginStatus.UNKNOWN) {
    return (
      <AppShell>
        <Center style={{ minHeight: '100vh' }}>
          <Text fw={500}>Authenticating</Text>
          &nbsp; &nbsp;
          <Loader color="dark" size="sm" variant="dots" />
        </Center>
      </AppShell>
    );
  }

  return <>{props.children}</>;
};
