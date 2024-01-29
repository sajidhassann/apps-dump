import { Box, Button, Group, Loader, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { CRM_API_URL } from '@/application/constants/urls'
import { ICampaignBucketState } from '@/application/redux/states/agent/campaignBucket/types'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import axios from 'axios'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { loadBuckets } from '@/application/redux/networkThunk/agent/campaignBucket'
import PaginatedTable from '@/application/components/core/PaginatedTable'
import { Ticket } from '@/application/models/ticket/tickets.model'
import { MediaData } from '@/application/components/core/MediaSelector'
import { SuccessMessage } from '@/application/components/agent/SuccessMessage'

interface SalesProps {
    eventData: any
    closeModal: () => void
}
export function Sales(props: SalesProps) {
    const { eventData, closeModal } = props
    const [isSumitting, setIsSubmitting] = useState(false)
    const getAttribute = (attributeName: string) => {
        if (eventData.data.contact.custom_attributes[attributeName] != undefined)
            return eventData.data.contact.custom_attributes[attributeName]
        else if (eventData.data.conversation.custom_attributes[attributeName] != undefined)
            return eventData.data.conversation.custom_attributes[attributeName]
        else
            return ''
    }

    const extractNames = (fullName: string): { firstName: string, lastName?: string } => {
        if (fullName == undefined)
            return { firstName: '' }


        const names = fullName.trim().split(/\s+/)

        const firstName = names[0]
        const lastName = names.length > 1 ? names.slice(1).join(' ') : undefined

        return { firstName, lastName }
    }

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadBuckets())
    }, [])

    const { buckets, isLoading }: ICampaignBucketState = useAppSelector(state => state.campaignBucket)
    const form = useForm({
        initialValues: {
            fName: extractNames(getAttribute('Full Name')).firstName ?? '',
            lName: extractNames(getAttribute('Full Name')).lastName ?? '',
            number: eventData.data.contact.phone_number ?? '',
            interestedIn: '',
            cohortID: '',
        },
    })

    const token = '39995c3e-ac43-4a41-a92b-d4fb737af090'
    const onAddCohortCall = async (values: any) => {
        console.log('requestBody :>> ', values)
        setIsSubmitting(true)
        const response = await axios.post(
            `${CRM_API_URL}/agent/cohort-call`,
            values,
            { headers: {
                    'x-api-key':token
                }
            }
        )
        setIsSubmitting(false)
        if (response.status === 201)
            closeModal()


    }

    return (<>

        {isLoading ? <Loader /> : null}
        {(buckets) && (
            <main>
                <form onSubmit={form.onSubmit((values) => {
                    console.log('values :>> ', values)
                    onAddCohortCall(values).finally()
                })}>
                    <Box sx={{ margin: 10 }}>
                        <TextInput required label="Number" placeholder="Number" {...form.getInputProps('number')} />
                    </Box>
                    <Box sx={{ margin: 10, display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <TextInput sx={{ marginRight: 2, width: '47%' }} label="First Name" placeholder="First Name" {...form.getInputProps('fName')} />
                        <TextInput sx={{ marginLeft: 2, marginRight: 0, width: '47%' }} label="Last Name" placeholder="Last Name" {...form.getInputProps('lName')} />
                    </Box>
                    <Box sx={{ margin: 10 }}>
                        <TextInput
                            label={<span style={{ color: '#1B2559' }}>Interested In</span>}
                            {...form.getInputProps('interestedIn')}
                        />
                    </Box>
                    <Box sx={{ margin: 10 }}>
                        <Select
                            data={buckets.map((bucket) => ({ value: bucket.id, label: bucket.name }))}
                            label="Cohort"
                            required
                            {...form.getInputProps('cohortID')}
                        />
                    </Box>
                    <Group mt="xl" position="right">
                        <Button
                            loading={isSumitting}
                            variant="filled"
                            type="submit"
                            sx={{
                                color: '#FFF',
                                background: '#F2AE1C',
                                outlineColor: 'transparent',
                                ':hover': {
                                    color: '#FFF',
                                    background: '#F2AE1C',
                                    outlineColor: 'transparent',
                                }
                            }}
                        >
                            Send
                        </Button>
                    </Group>
                </form>
            </main>
        )}
    </>)
}
