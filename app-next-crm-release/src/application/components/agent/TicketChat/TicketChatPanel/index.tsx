import MissHuma from '@/application/components/shared/MissHuma'
import { useAppSelector } from '@/application/redux/hooks'
import { ITicketState } from '@/application/redux/states/agent/ticket/types'
import { Box, Grid } from '@mantine/core'
import ChatHeader from './ChatHeader'
import ChatWindow from './ChatWindow'
import MessageInput from './ChatWindow/MessageInput'


const TicketChatPanel = () => {

    const { currentTicket }: ITicketState = useAppSelector((state) => state.ticket)
    const { showContactProfile } = useAppSelector(state => state.layout)

        
    return(
        <Grid.Col span={showContactProfile ? 6 : 9} p={0} m={0}>
            {!currentTicket ? ( <MissHuma /> ) : (
                <Box sx={{ position: 'relative' }}>
                    <ChatHeader name={currentTicket.username} phoneNumber={currentTicket.number} />
                    <ChatWindow />
                    <MessageInput />
                </Box>
            )}
        </Grid.Col>
    )
}

export default TicketChatPanel