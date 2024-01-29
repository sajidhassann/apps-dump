import { MenuItem } from '@application/constants/menu/types';
import { AppShellSection, NavLink, Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaDoorOpen } from 'react-icons/fa6';
import NavbarControl, { NavbarControlPropTypes } from '../NavbarControl';

export interface NavbarPropTypes extends NavbarControlPropTypes {
  logout: () => void;

  menu: MenuItem[];
}

export default function CustomNavbar(props: NavbarPropTypes): JSX.Element {
  const { opened, toggle, logout, menu } = props;

  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const theme = useMantineTheme();

  const currentPath = usePathname();

  return (
    <>
      <Switch
        size="md"
        p="md"
        color={isDarkTheme ? 'gray' : 'dark'}
        checked={isDarkTheme}
        onLabel={<IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />}
        offLabel={<IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />}
        onClick={() => {
          setColorScheme(isDarkTheme ? 'light' : 'dark');
        }}
      />
      <AppShellSection>
        <NavbarControl opened={opened} toggle={toggle} />
      </AppShellSection>

      <AppShellSection pr="lg" pl="lg" pt="xs">
        {menu?.map((navLink, index) => (
          <NavLink
            active={currentPath?.endsWith(navLink.url)}
            key={index}
            leftSection={<>{navLink.icon && <navLink.icon size="24px" />}</>}
            component={Link}
            href={navLink.url}
            passHref
            label={navLink.title}
          />
        ))}
        <NavLink
          leftSection={
            <>
              <FaDoorOpen size="24px" />
            </>
          }
          onClick={() => {
            logout();
          }}
          component={Link}
          href="#"
          passHref
          label="Logout"
        />
      </AppShellSection>
    </>
  );
}
