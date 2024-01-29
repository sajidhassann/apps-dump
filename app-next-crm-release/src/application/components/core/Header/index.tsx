import { useAppSelector } from '@/application/redux/hooks'
import {
  Avatar,
  Box,
  Flex,
  Group,
  Header,
  Image,
  MediaQuery,
  Text
} from '@mantine/core'
import NavbarControl, { NavbarControlPropTypes } from '../NavbarControl'
import useStyles from './styles'

interface UserHeaderData {
  readonly id: string;
  readonly fName: string;
  readonly lName: string;
  readonly photo: string;
  readonly email: string;
}

export interface HeaderPropTypes extends NavbarControlPropTypes {
  user?: UserHeaderData;
}

export default function CustomHeader(props: HeaderPropTypes): JSX.Element {
  const { isNavbarExpand, setIsNavbarExpand } = props

  const { user } = useAppSelector(state => state.auth)

  const { classes } = useStyles()

  return (
    <Header height={{ base: 50, md: 60 }} p="sm" px="lg">
      <Group position="apart" align="center">
        <Box>
          <NavbarControl
            isNavbarExpand={isNavbarExpand}
            setIsNavbarExpand={setIsNavbarExpand}
          />
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Image
              src="/assets/images/brands/logo-urdu-zero-margins.png"
              alt="maqsad-logo"
              height={24}
              width={82}
            />
          </MediaQuery>
        </Box>

        <Flex align="center">
          <Avatar
            mr="md"
            radius="xl"
            src={user?.photo ?? '/assets/imgs/image.png'}
            alt="user"
          />
          <Text className={classes.email}>
            {`${user?.email ?? 'Alaeddin Keykubat'}`}
          </Text>
        </Flex>
      </Group>
    </Header>
  )
}
