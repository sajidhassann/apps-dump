import { MenuItem } from '@/application/constants/menu/types'
import { useAppDispatch } from '@/application/redux/hooks'
import { createStyles, Navbar, rem, Stack, Tooltip, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconLayoutDashboard, IconLogout, IconMessage, IconUsers } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'


export interface NavbarPropTypes {
    isNavbarExpand: boolean
    setIsNavbarExpand: React.Dispatch<React.SetStateAction<boolean>>
    logout: () => void
    menu: MenuItem[]
}

const useStyles = createStyles((theme) => ({
    link: {
      width: rem(50),
      height: rem(50),
      borderRadius: theme.radius.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.secondary[0],
  
      '&:hover': {
        backgroundColor: theme.colors.gray[0],
      },
    },
  
    active: {
      '&, &:hover': {
        backgroundColor: theme.colors.lightBlue[0],
        color: theme.colors.background[0],
      },
    },
  }))

// TODO: Move to appropriate files and make types
const routes = [
    { icon: IconLayoutDashboard, label: 'Dashboard', route: '/agent/' },
    { icon: IconUsers, label: 'Cohort', route: '/agent/manage' },
    { icon: IconMessage, label: 'Chat Support', route: '/agent/chat' },
]

function NavbarLink({ icon: Icon,route, label, active, onClick }: {
    icon: React.FC<any>;
    route: string;
    label: string;
    active?: boolean;
    onClick?(): void;
  }) {
    const { classes, cx } = useStyles()

    const { pathname } = useRouter()

   // FIXME: Add Styles dynamically

    return (
      <Link href={route}>
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: pathname == '/agent/chat' && label === 'Chat Support' })} >
            <Icon size="1.2rem" stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
      </Link>
    )
  }

export default function CustomNavbar(props: NavbarPropTypes): JSX.Element {

    const { classes, cx } = useStyles()
    const { isNavbarExpand, setIsNavbarExpand, logout, menu } = props

    const router = useRouter()
    const isActive = useCallback((path: string) => path === router.asPath, [router])

    const dispatch = useAppDispatch()
    const [opened, { toggle }] = useDisclosure(false)

    const [active, setActive] = useState(2)


    const links = routes.map((link, index) => (
        <NavbarLink
          {...link}
          key={link.label}
          active={index === active}
          onClick={() => {setActive(index)}}
        />
    ))

    return (
        <Navbar height="90vh" width={{ base: 80 }} p="sm">
            <Navbar.Section grow mt={10}> 
                <Stack justify="center" spacing={0}>
                    {links}
                </Stack>
                <Navbar.Section onClick={() => { logout() }} sx={{ cursor: 'pointer' }}>
                    <NavbarLink label='Logout' route='' active={false} icon={IconLogout} />
                </Navbar.Section>
            </Navbar.Section>
        </Navbar>
    )

}
