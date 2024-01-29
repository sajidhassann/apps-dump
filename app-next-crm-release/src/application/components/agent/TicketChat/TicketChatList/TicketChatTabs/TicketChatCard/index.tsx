import { Ticket } from '@/application/models/ticket/tickets.model'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { setCurrentTicket } from '@/application/redux/states/agent/ticket'
import { ITicketState } from '@/application/redux/states/agent/ticket/types'
import { Card, Group, Stack, Text, useMantineTheme } from '@mantine/core'
import CardCheckbox from './CardCheckbox'
import useStyles from './styles'
import moment from 'moment/moment'
import { toggleMacrosManager } from '@/application/redux/states/shared/macros'

interface ITicketChatCardProps {
    ticket: Ticket
}

export default function TicketChatCard(props: ITicketChatCardProps) {

    const {
        ticket, 
    } = props
    const { currentTicket }: ITicketState = useAppSelector((state) => state.ticket)

    const { classes } = useStyles()
    const dispatch = useAppDispatch()
    const theme = useMantineTheme()


    return (
        <Card
            radius='md' 
            m='xs'
            className={classes.card}
            sx={{ backgroundColor: ticket.id === currentTicket?.id ?
                    theme.colors.secondary.at(1) : !ticket.isRead ?
                        '#9ecae9' : 'white',
            color: ticket.id === currentTicket?.id ? theme.colors.background.at(0) : 'black' }}
            onClick={() => {
                dispatch(setCurrentTicket(ticket))
                dispatch(toggleMacrosManager(false))
            }}>
            <Card.Section className={classes.container}>
                <Stack sx={{ gap: '0.3rem', width: '100%' }}>
                    <Group position='apart' pos='relative'>
                        <CardCheckbox ticket={ticket} />
                        <Text sx={{ color: ticket.id === currentTicket?.id ? theme.colors.background.at(0) : 'black' }} className={classes.userName}>{ticket.username}</Text>
                        <Text sx={{ color: ticket.id === currentTicket?.id ? theme.colors.background.at(0) : 'black' }} className={classes.timestamp}>{moment(ticket.lastMessageAt).fromNow()}</Text>
                    </Group>
                    <Text sx={{ color: ticket.id === currentTicket?.id ? theme.colors.background.at(0) : 'black' }} className={classes.email}>
                        {ticket.agentEmail ?? ''}
                    </Text>
                </Stack>
            </Card.Section>
        </Card>
    )
 }