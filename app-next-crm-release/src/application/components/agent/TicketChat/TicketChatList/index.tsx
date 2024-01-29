import { Grid, Group } from '@mantine/core'
import TicketChatTabs from './TicketChatTabs'
import TicketFilterMenu from './TicketFilterMenu'
import useStyles from './styles'
import TicketSelectAll from './TicketSelectAll'
import Archive from './Archive'
import SearchInput from './searchInput'
import TicketSettingsMenu from './TicketSettingsMenu'

const TicketChatList = () => {
    const { classes } = useStyles()
    return (
        <Grid.Col span={3} className={classes.container} p={0} m={0}>
            <Group p="xs" position="apart">
                <SearchInput/>
                <TicketFilterMenu />
                <TicketSettingsMenu />
            </Group>

            <Group p="xs" position="apart">
                <Archive/>
                <TicketSelectAll/>
            </Group>
            <TicketChatTabs/>
        </Grid.Col>
    )
}

export default TicketChatList



