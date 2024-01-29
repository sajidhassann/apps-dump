import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { ITicketState } from '@/application/redux/states/agent/ticket/types'
import { setShowContactProfile } from '@/application/redux/states/shared/layout'
import { Box, Button, Card, Group, Text, useMantineTheme } from '@mantine/core'
import { useCallback, useState } from 'react'
import AddToCohortModal from '../../../AddToCohort'
import ReportBugModal from '../../../ReportBugModal'
import useStyles from './styles'

interface ChatHeaderProps {
    name: string;
    phoneNumber: string;
}

export default function ChatHeader(props: ChatHeaderProps) { 

    const { name, phoneNumber } = props

    const theme = useMantineTheme()
    const { classes } = useStyles()
    
    const dispatch = useAppDispatch()

    const onOpenContactProfileHandler = useCallback(() => {
        dispatch(setShowContactProfile(true))
    }, [dispatch])

    const [showReportBugModal, setShowReportBugModal] = useState<boolean>(false)
    const [salesModalOpen, setSalesModalOpen] = useState<boolean>(false)
    const { currentTicket, ticketMessages }: ITicketState = useAppSelector((state) => state.ticket)
    return (
            <>
                <Card w='100%' shadow="sm" radius="sm" p='xs'>
                    <Card.Section className={classes.card}>
                        <Group w='100%' position="apart" ml="md">
                            <Box sx={{ padding: '10px 5px', cursor: 'pointer' }} onClick={onOpenContactProfileHandler}>
                                <Text className={classes.name}>{name}</Text>
                                <Text className={classes.phoneNumber}>+{phoneNumber}</Text>
                            </Box>
                            <Box p='lg'>
                                <Button bg={theme.colors.accent[0]} mr='xs' size='sm' radius='md' onClick={() => setShowReportBugModal(true)}>Report Bug</Button>
                                <Button onClick={() => setSalesModalOpen(true)} size='sm' radius='md' className={classes.salesButton}>Redirect To Sales</Button>
                            </Box>
                        </Group>
                    </Card.Section>
                </Card>
                {showReportBugModal && <ReportBugModal setIsOpen={setShowReportBugModal} isOpen={showReportBugModal}  currentChat={currentTicket} messages={
              ticketMessages
                ?.filter((message) => Boolean(message.mimeType))
                ?.map((message) => {
                  return {
                    id: message?.id ?? '',
                    url: message?.mediaURL ?? '',
                    mimeType: message?.mimeType ?? ''
                  }
                })
            } />}
                   {salesModalOpen && <AddToCohortModal
                isOpen={salesModalOpen}
                setIsOpen={setSalesModalOpen}
                currentChat={currentTicket}
            />}
            </>
    )
    
}