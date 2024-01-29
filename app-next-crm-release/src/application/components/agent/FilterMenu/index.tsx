import { FC, PropsWithChildren } from 'react'
import { Box, Menu } from '@mantine/core'
import { IconFilter } from '@tabler/icons-react'


const FilterMenu: FC<PropsWithChildren> = (props) => {
    const { children } = props

    return <Menu>
        <Menu.Target >
                <IconFilter size={15} />
        
        </Menu.Target>
        <Menu.Dropdown px={8}>
            {children}
        </Menu.Dropdown>
    </Menu>

}

export default FilterMenu