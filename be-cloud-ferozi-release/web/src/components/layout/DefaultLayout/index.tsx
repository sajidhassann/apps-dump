import { AppShell } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { ReactNode } from 'react';
import CustomHeader, { HeaderPropTypes } from '../../core/Header';
import CustomNavbar, { NavbarPropTypes } from '../../core/Navbar';
import { FooterPropTypes } from '../../core/Footer';
import { NavbarControlPropTypes } from '../../core/NavbarControl';

type DefaultLayoutDataProps = {
  headerProps: HeaderPropTypes;
  navbarProps: NavbarPropTypes;
  footerProps: FooterPropTypes;
  navbarControlProps: NavbarControlPropTypes;
};

export type DefaultLayoutProps = {
  children: ReactNode;
  data: DefaultLayoutDataProps;
  showHeader?: boolean;
  showSideBar?: boolean;
};

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { data, children } = props;
  const { navbarProps, headerProps, footerProps, navbarControlProps } = data;
  const { opened, toggle } = navbarControlProps;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 220, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="xl"
    >
      <AppShell.Header>
        <CustomHeader {...headerProps} opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar>
        <CustomNavbar {...navbarProps} />
      </AppShell.Navbar>
      <AppShell.Main mb={100} h="110vh">

        {children}
      </AppShell.Main>
      <Notifications />
    </AppShell>
  );
};

export default DefaultLayout;
