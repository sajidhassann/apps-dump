import { Box, Button, Group, Loader, Modal, Select, Stack, TextInput, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import { CRM_API_URL } from '@/application/constants/urls'
import { ICampaignBucketState } from '@/application/redux/states/agent/campaignBucket/types'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import axios from 'axios'
import { loadBuckets } from '@/application/redux/networkThunk/agent/campaignBucket'
import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { ReportBug } from '../ReportBug'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Sales } from '../Sales'
import useStyles from './styles'


interface ChatwootProps {
    eventData: any
}

const ChatwootComponent = (props: ChatwootProps): JSX.Element => {
    const { eventData } = props
    const theme = useMantineTheme()
    const [reportBugModalState, reportBugModalCallback] = useDisclosure(false);
    const [redirectToSalesState, redirectToSalesCallback] = useDisclosure(false);
    const { classes } = useStyles()




    return (<>
        <Stack h={"100vh"} w={"100%"} align='center' justify='center'>
            <Modal opened={reportBugModalState} onClose={reportBugModalCallback.close} size="auto" title="Report Bug">
                <ReportBug eventData={eventData} closeModal={reportBugModalCallback.close} />
            </Modal>
            <Modal opened={redirectToSalesState} onClose={redirectToSalesCallback.close} size="auto" title="Redirect To Sales">
                <Sales eventData={eventData} closeModal={redirectToSalesCallback.close} />
            </Modal>
            <Button bg={theme.colors.accent[0]} w={300} size='sm' radius='md' onClick={reportBugModalCallback.open}>Report Bug </Button>
            <Button className={classes.salesButton} w={300}  size='sm' radius='md' onClick={redirectToSalesCallback.open}>Redirect To Sales</Button>
        </Stack>

    </>)
}

export default ChatwootComponent