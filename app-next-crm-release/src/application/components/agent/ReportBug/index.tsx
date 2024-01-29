import { Button, Group, Loader, MultiSelect, Select, Table, TextInput } from '@mantine/core'
import { MediaData, MediaSelector } from '@/application/components/core/MediaSelector'
import { CRM_API_URL } from '@/application/constants/urls'
import { useForm } from '@mantine/form'
import { useAppSelector } from '@/application/redux/hooks'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { NotionNetworkManager } from '@/application/services/networking/notion'
import { NotionUserNetworkModel } from '@/application/services/networking/models/notion.user.network.model'
import { SuccessMessage } from '../SuccessMessage'

interface ReportBugProps {
    eventData: any
    closeModal: () => void
}

export function ReportBug(props: ReportBugProps) {
    const { user } = useAppSelector(state => state.auth)
    const { eventData, closeModal } = props

    const [searchValue, onSearchChange] = useState('')
    const [notionUsers, setNotionUsers] = useState<{ value: string, label: string }[]>([])
    const [ticketMedia, setTicketMedia] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const getAttribute = (attributeName: string) => {
        if (eventData.data.contact.custom_attributes[attributeName] != undefined)
            return eventData.data.contact.custom_attributes[attributeName]
        else if (eventData.data.conversation.custom_attributes[attributeName] != undefined)
            return eventData.data.conversation.custom_attributes[attributeName]
        else
            return ''
    }

    const getPhoneNumber = () => {
        if (getAttribute('User ID')) 
            return eventData.data.contact.phone_number
         else 
            return ''
        
    }

    const getCoversationMediaImages = (): MediaData[] => {
        const data = eventData.data.conversation.attachments.map((d: any) => {
            return { id: d.message_id, mimeType: d.file_type, url: d.data_url }
        })
        return data
    }

    const form = useForm({
        initialValues: {
            title: '',
            studentNumber: getPhoneNumber(),
            priority: '',
            appVersion: getAttribute('App Version'),
            teams: '',
            type: '',
            agentEmail: user?.email ?? 'aliya@maqsad.io',
            assigneeIDs: [],
            errorDetails: {
                message: '',
                mediaUrls: [],
            },
        },
    })
    const onReportBug = async (values: any) => {

        setIsSubmitting(true)

        if (ticketMedia.length === 0) {
            const continueRegardless = confirm('No media selected for ticket. Are you sure you want to continue?')

            if (!continueRegardless) {
                setIsSubmitting(false)
                return
            }
        }

        values.errorDetails.mediaUrls = ticketMedia
        values.agentEmail = user?.email ?? 'aliya@maqsad.io'

        console.log(values.agentEmail)

        const response = await axios.post(
            `${CRM_API_URL}/notion/complaint`,
            values
        )

        setIsSubmitting(false)

        if (response.status === 201) 
            closeModal()
        
    }

    const handleMediaSelect = (selectedMedia: MediaData[]) => {
        console.log('Selected media for ticket:', selectedMedia)
        setTicketMedia(selectedMedia.map(media => media.url))
    }

    useEffect(() => {
        if (notionUsers.length === 0) {
            NotionNetworkManager.retrieve.listNotionUsers()
                .then((users: NotionUserNetworkModel[]) => {
                    setNotionUsers(users.map(user => ({ value: user.id, label: user.name })))
                })
                .catch((error: Error) => {
                    console.log('Unable to fetch Notion users: ', error)
                })
        }
    }, [notionUsers])

    return (
        <>

            <form onSubmit={form.onSubmit((values) => {
                console.log('!!INFO: Submitted values: ', values)
                onReportBug(values).finally()
            })}>
                <Table>

                    <tbody>
                        <tr>
                            <td colSpan={2} style={{ borderWidth: '0px', fontWeight: 700 }}>Summary</td>
                        </tr>

                        <tr style={{ borderWidth: '0px' }}>
                            <td colSpan={2} style={{ borderWidth: '0px' }}>
                                <TextInput required label="Title" placeholder="Enter a short, on-point title" {...form.getInputProps('title')} />
                            </td>
                        </tr>

                        <tr style={{ borderWidth: '0px' }}>
                            <td style={{ borderWidth: '0px' }}>
                                <TextInput required label="Registered Number on Maqsad" placeholder="+923000627723" {...form.getInputProps('studentNumber')} />
                            </td>
                            <td style={{ borderWidth: '0px' }}>
                                <Select
                                    data={[
                                        {
                                            label: 'Paid User',
                                            value: 'Paid User',
                                        },
                                        {
                                            label: 'Free User',
                                            value: 'Free User',
                                        },
                                        {
                                            label: 'Warr Gaya!!!',
                                            value: 'Warr Gaya!!!',
                                        },
                                        {
                                            label: 'Internal Team',
                                            value: 'Internal Team',
                                        },
                                    ]}
                                    label="Priority"
                                    placeholder="Select a priority"
                                    required
                                    {...form.getInputProps('priority')}
                                />
                            </td>
                        </tr>

                        <tr style={{ borderWidth: '0px' }}>
                            <td style={{ borderWidth: '0px' }}>
                                <TextInput required label="App Version" placeholder="6.0.1" {...form.getInputProps('appVersion')} />
                            </td>
                            <td style={{ borderWidth: '0px' }}>
                                <MultiSelect
                                    data={notionUsers?.map((val) => val)}
                                    label="Assign To"
                                    searchable
                                    searchValue={searchValue}
                                    onSearchChange={onSearchChange}
                                    nothingFound="No results :( Try again!"
                                    placeholder="Add relevant people to this ticket"
                                    {...form.getInputProps('assigneeIDs')}
                                />
                            </td>
                        </tr>

                        <tr style={{ borderWidth: '0px' }}>
                            <td style={{ borderWidth: '0px' }}>
                                <MultiSelect
                                    data={[
                                        {
                                            label: 'Mobile',
                                            value: 'Mobile',
                                        },
                                        {
                                            label: 'Backend',
                                            value: 'Backend',
                                        },
                                        {
                                            label: 'Frontend',
                                            value: 'Frontend',
                                        },
                                        {
                                            label: 'Design',
                                            value: 'Design',
                                        },
                                        {
                                            label: 'Product',
                                            value: 'Product',
                                        },
                                        {
                                            label: 'Biz-Ops',
                                            value: 'Biz-Ops',
                                        },
                                        {
                                            label: 'Data',
                                            value: 'Data',
                                        },
                                    ]}
                                    label="Teams"
                                    searchable
                                    searchValue={searchValue}
                                    onSearchChange={onSearchChange}
                                    nothingFound="No results :( Try again!"
                                    placeholder="Add relevant Teams to this ticket"
                                    {...form.getInputProps('teams')}
                                />
                            </td>

                            <td style={{ borderWidth: '0px' }}>
                                <Select
                                    data={[
                                        {
                                            label: 'In App',
                                            value: 'In App',
                                        },
                                        {
                                            label: 'OTP — In App',
                                            value: 'OTP — In App',
                                        },
                                        {
                                            label: 'DS — In App',
                                            value: 'DS — In App',
                                        },
                                        {
                                            label: 'Chaabi',
                                            value: 'Chaabi',
                                        },
                                        {
                                            label: 'Jango',
                                            value: 'Jango',
                                        },
                                        {
                                            label: 'Superset',
                                            value: 'Superset',
                                        },
                                        {
                                            label: 'Mixpanel',
                                            value: 'Mixpanel',
                                        },
                                    ]}
                                    label="Type"
                                    placeholder="Select a type"
                                    required
                                    {...form.getInputProps('type')}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2} style={{ borderWidth: '0px', fontWeight: 700 }}>Details</td>
                        </tr>

                        <tr style={{ borderWidth: '0px' }}>
                            <td colSpan={2} style={{ borderWidth: '0px' }}>
                                <TextInput required label="Description" placeholder="User is trying to take a photo, but the..." {...form.getInputProps('errorDetails.message')} />
                            </td>
                        </tr>

                        <tr style={{ borderWidth: '0px' }}>
                            <td colSpan={2} style={{ borderWidth: '0px' }}>
                                <MediaSelector media={getCoversationMediaImages()} onSelect={handleMediaSelect} />
                                {
                                    ticketMedia.length === 0 &&
                                    <p style={{ color: 'red' }}>No media selected!</p>
                                }
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <Group mt="xl" position="right">
                    <Button
                        variant="filled"
                        color="pink"
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        Report Bug
                    </Button>
                </Group>
            </form>

        </>)
}
