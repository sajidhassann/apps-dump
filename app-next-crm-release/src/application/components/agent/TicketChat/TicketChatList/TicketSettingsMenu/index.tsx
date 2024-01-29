import { Menu, useMantineTheme } from '@mantine/core'
import { IconDotsVertical } from '@tabler/icons-react'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { toggleMacrosManager } from '@/application/redux/states/shared/macros'



const TicketSettingsMenu = () => {
  const theme = useMantineTheme()
  const dispatch = useAppDispatch()

  return (
    <Menu
      shadow="md"
      width={200}
      transitionProps={{ transition: 'rotate-right', duration: 150 }}
    >
      <Menu.Target>
        <IconDotsVertical
          size="20"
          color={theme.colors.background[3]}
          cursor="pointer"
        />
      </Menu.Target>
      <Menu.Dropdown >
        <Menu.Item key="Messaging tools" onClick={() => {
          dispatch(toggleMacrosManager(true))
          
        }}>
          Messaging tools
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default TicketSettingsMenu