import useDebounce from '@/application/components/core/hooks/UseDebounce'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { ITicketState } from '@/application/redux/states/agent/ticket/types'
import { IAuthState } from '@/application/redux/states/shared/auth/types'
import { SocketEvent } from '@/application/socket/socket.events.enum'
import { Box, Button, Card, FileInput, Text, Textarea } from '@mantine/core'
import { KeyboardEventHandler, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import useStyles from './styles'
import useSocket from '@/application/socket/useSocket'
import { IMacroState } from '@/application/redux/states/shared/macros/types'
import { IconReload } from '@tabler/icons-react'
import { getMacros } from '@/application/redux/networkThunk/macros'
import { Macro } from '@/application/models/macro/macro.model'


export default function MessageInput() {

    const { classes } = useStyles()
    const dispatch = useAppDispatch()
    const [{ currentTicket }, { user }, { macros: MACROS }]: [ITicketState, IAuthState, IMacroState] = useAppSelector((state) => [state.ticket, state.auth, state.macro])
    const [messageContent, setMessageContent] = useState<string>('')
    const [macros, setMacros] = useState<Macro[]>([])
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const [file, setFile] = useState<File | null>()

    const { socket } = useSocket()
    const sendMessage = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>((e) => {
        if (e.shiftKey || messageContent.trim().length === 0 || e.code !== 'Enter')
            return

        socket?.emit(SocketEvent.SEND_AGENT_MESSAGE, {
            agentID: user?.id,
            agentEmail: user?.email,
            ticketID: currentTicket?.id,
            messageContent
        })
        setTimeout(() => {
            setMessageContent('')
        }, 300)

    }, [currentTicket?.id, messageContent, socket, user?.email, user?.id])

    const sendFile = useCallback<MouseEventHandler<HTMLButtonElement>>((e)=>{
        socket?.emit(SocketEvent.SEND_AGENT_MESSAGE, {
            file,
            agentID: user?.id,
            agentEmail: user?.email,
            ticketID: currentTicket?.id,
            fileName: file?.name,
            mimeType: file?.type,
        })
    },[currentTicket?.id, file, socket, user?.email, user?.id])

    useEffect(()=>{
        setMacros(MACROS)
    },[MACROS])

    useDebounce(() => {
        if (messageContent.startsWith('/') && messageContent.length > 1) {
            const regEx = new RegExp(messageContent.slice(1), 'gi')
            setMacros(MACROS.filter((macro) => macro.tag?.match(regEx)))
        } else {
            setMacros(MACROS)
        }
    }, 500, [messageContent])

    return (
        <Box className={classes.container}>
            {messageContent.startsWith('/') && macros.length > 0 &&
                <Card withBorder radius="md" p="xs" className={classes.card}>
                    <IconReload size={21} className={classes.reload} onClick={()=> dispatch(getMacros())} />
                    {
                        macros.map((macro) => (
                            <Box key={macro.id} className={classes.macroBox} p="sm"
                                 onClick={() => {
                                     setMessageContent(macro.response)
                                     inputRef.current?.focus()
                                 }}
                            >
                                <Text>
                                    {macro.title}
                                </Text>
                                <Text fz="xs" c="dimmed" mt={3} mb="xl" className={classes.description}>
                                    {macro.response}
                                </Text>
                            </Box>))
                    }
                </Card>}

            <Box sx={{ display: 'flex', flexDirection:'row' }}>
                <FileInput
                    disabled={currentTicket?.isDisabled || currentTicket?.agentEmail !== user?.email}
                    placeholder="Select a file"
                    onChange={setFile}
                    sx={{ width: '85%' }}
                    clearable
                />
                <Button
                    onClick={sendFile}
                    disabled={!file || currentTicket?.isDisabled || currentTicket?.agentEmail !== user?.email}
                    sx={{ width: '15%', backgroundColor: '#5E85BC' }}>
                    send
                </Button>
            </Box>
            <Textarea
                value={messageContent}
                ref={inputRef}
                onChange={(e) => setMessageContent(e.target.value)}
                onKeyDownCapture={sendMessage}
                placeholder="Write a response..."
                className={classes.messageInput}
                minRows={4}
                disabled={currentTicket?.isDisabled || currentTicket?.agentEmail !== user?.email}
            />
        </Box>
    )

}