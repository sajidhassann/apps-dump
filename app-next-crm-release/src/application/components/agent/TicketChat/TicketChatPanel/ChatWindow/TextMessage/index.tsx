import { Mime } from '@/application/constants/enums/mime.enum'
import { TicketMessage } from '@/application/models/ticket/ticket.message.model'
import { Box, Button, Image } from '@mantine/core'
import { useCallback, useMemo, useState } from 'react'
import ImageModal from './ImageModal'
import useStyles from './styles'

interface TextMessageProps {
    message: TicketMessage
}

export default function Message(props: TextMessageProps) {
    const {
        message
    } = props
    const { classes } = useStyles()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleModalToggle = useCallback(() => {
        setIsModalOpen((isModalOpen) => !isModalOpen)
    }, [])

    const renderContent = useMemo(() => {
        if (message.mime === Mime.IMAGE) {
            return (
                <Box
                    className={classes.imageContainer}
                    onClick={handleModalToggle}
                >
                    <Image className={classes.image} src={message.mediaURL} alt=""/>
                    {message.content && <Box className={classes.userMessage}>{message.content}</Box>}
                </Box>
            )
        }

        if (message.mime === Mime.VIDEO) {
            return (
                <Box className={classes.videoContainer} >
                    <video className={classes.video} controls>
                        <source src={message.mediaURL}/>
                    </video>
                    {message.content && <Box className={classes.userMessage}>{message.content}</Box>}
                </Box>
            )
        }

        if (message.mime === Mime.AUDIO) {
            return <audio controls>
                    <source src={message.mediaURL}/>
                </audio>
        }

        if (message.mime in { [Mime.TEXT]: true, [Mime.APP]:true }) {
            return <Button variant='outline' component='a' href={message.mediaURL} target='_blank'>
                Download Document
            </Button>
        }

        return (
            <>{message.content}</>
        )
    }, [classes.image, classes.imageContainer, classes.userMessage, classes.video, classes.videoContainer, handleModalToggle, message.content, message.mediaURL, message.mime])

    const renderModal = () => {
        if (message.mime === Mime.IMAGE) {
            return (
                <ImageModal
                    isImageModalOpen={isModalOpen}
                    setIsImageModalOpen={setIsModalOpen}
                    imageURL={message.mediaURL}
                />
            )
        }

        return null
    }

    const userMessage = (
        <>
            <Box className={classes.userMessageContainer}>
                {renderContent}
            </Box>
            <Box className={classes.timestamp}>{message.createdAt.toLocaleString()}</Box>
        </>
    )

    const agentMessage = (
        <Box className={classes.agentOutlineContainer}>
            <Box className={classes.agentMessageContainer}>
                {renderContent}
                {message.recipient && <Box className={classes.agent}>{message.recipient}</Box>}
            </Box>
            <Box className={classes.agentTimestamp}>{message.createdAt.toLocaleString()}</Box>
        </Box>
    )

    return (
        <>
            {message.isUserMessage ? userMessage : agentMessage}
            {renderModal()}
        </>
    )
}
