import AgentCallDialog from '@/application/components/agent/AgentCallDialog'
import PaginatedTable, { PaginatedTableProps } from '@/application/components/core/PaginatedTable'
import { DEFAULT_PAGE_SIZE, Enums } from '@/application/constants'
import { CampaignBucketCall } from '@/application/models/cohort/campaign.bucket.call.model'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { loadBucketCalls, updateBucketCall } from '@/application/redux/networkThunk/agent/campaignBucket'
import { completeBucketList, updateBucketList } from '@/application/redux/states/agent/campaignBucket'
import { ICampaignBucketState } from '@/application/redux/states/agent/campaignBucket/types'
import { IAuthState } from '@/application/redux/states/shared/auth/types'
import { Badge, Box, Button, createStyles, Group, Loader, Select, Space, Text, TextInput } from '@mantine/core'
import { IconBrandWhatsapp, IconPencil, IconPhone } from '@tabler/icons-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import AgentModal from '../AgentModal'
import useSocket from '@/application/socket/useSocket'
import CohortCallPagination from '@/application/models/ticket/cohort.call.pagination'
import FilterModal from '../FilterModal'
import { useRouter } from 'next/router'
import { getAllAgents } from '@/application/redux/networkThunk/agent/ticket'
import Utilities from '@/application/utils'
import { PhoneType } from '@/application/constants/enums/phone.type'
import { InterestStatus } from '@/application/constants/enums/interest.status'
import { useForm } from '@mantine/form'
import { CallStatus } from '@/application/constants/enums/callStatus'
import { User } from '@/application/models/shared/user.model'
import FilterMenu from '@/application/components/agent/FilterMenu'
import { DateInput } from '@mantine/dates'
import { IconFilter } from '@tabler/icons'

const statusColour: { [k: string]: string } = {
    [Enums.callStatus.PENDING]: 'red',
    [Enums.callStatus.IN_PROGRESS]: 'orange',
    [Enums.callStatus.CONNECTED]: 'orange',
    [Enums.callStatus.COMPLETED]: 'green',
    [Enums.callStatus.UNKNOWN]: '',
}

const useStyles = createStyles({
    status: { padding: '15px', fontWeight: 'bolder', fontSize: '12px' },
    cell: { width: '150px' },
})

type FormValues = {
    agentEmail: string;
    date: Date;
    interestStatus: InterestStatus;
    number: string
    status: CallStatus
    grade: string
};
type QueryValues = {
    agentEmail: string;
    date: string;
    interestStatus: InterestStatus;
    number: string
    status: CallStatus
    grade: string
};

export default function AgentDashboardTable() {
    const dispatch = useAppDispatch()

    const form = useForm<FormValues>()

    const router = useRouter()
    const { bucket, calls, isLoading }: ICampaignBucketState = useAppSelector(
        (state) => state.campaignBucket
    )
    const agents: User[] = useAppSelector((state) => state.ticket.agents)

    const { user }: IAuthState = useAppSelector((state) => state.auth)
    const [callerName, setCallerName] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [currentCallID, setCurrentCallID] = useState<string>('')
    const [selectedCall, setSelectedCall] = useState<CampaignBucketCall | null>(
        null
    )
    const [isNotesModalOpen, setIsNotesModalOpen] = useState<boolean>(false)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false)
    const [campaignBucketCall, setCampaignBucketCall] =
        useState<CampaignBucketCall>()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const { classes } = useStyles()

    const { on, socket } = useSocket()


    const initSockets = useCallback(() => {

        const update = on('update_client', (data: any) => {
            console.log('This is UPDATE CLIENT', data)
            dispatch(updateBucketList(data?.callID))
        })

        const disconnect = on(`${user?.email}_call-disconnected`, (data: any) => {
            console.log('This is UPDATE CLIENT COMPLETE', data)
            dispatch(completeBucketList(data?.callID))
        })

        return () => {
            update()
            disconnect()
        }
    }, [dispatch, on, user?.email])

    const loadData = useCallback((payload: CohortCallPagination) => {
        dispatch(loadBucketCalls(payload))
    }, [dispatch])

    useEffect(() => {
        loadData({ ...router.query, cohortID: bucket?.id as string, pageSize: DEFAULT_PAGE_SIZE, pageNumber: 1 })
    }, [bucket, router.query])


    useEffect(() => {
        // TODO: This is temporary, will be featching agents based on roles
        dispatch(getAllAgents())
    }, [])

    useEffect(initSockets, [initSockets])

    const onSave = useCallback((values: typeof form.values) => {

        const { agentEmail, date, interestStatus, number, status, grade } = values
        const query: Partial<QueryValues> = {}
        if (agentEmail)
            query['agentEmail'] = agentEmail

        if (date)
            query['date'] = date.toISOString().split('T')[0] as string

        if (interestStatus)
            query['interestStatus'] = interestStatus

        if (number)
            query['number'] = number

        if (status)
            query['status'] = status

        if (grade)
            query['grade'] = grade

        console.log(values)
        router.push({
            pathname: '/agent',
            query: query,
        }).finally()

    }, [form, router])


    const renderHeader = useCallback(() => {
        return <tr>
            <th>
                Name
            </th>
            <th>
                {'Number '}
                <FilterMenu>
                    <form onSubmit={form.onSubmit(onSave)}>
                        <Box my='md' sx={{ color: '#1B2559' }}>
                            <TextInput
                                {...form.getInputProps('number')}
                            />
                            <Space h="sm" />
                            <Button
                                type='submit'
                                variant='filled'
                                color='yellow'
                                fullWidth={true}
                            >
                                Apply
                            </Button>
                        </Box>
                    </form>
                </FilterMenu>

            </th>
            <th>
                Phone
            </th>
            <th>
                Tuition
            </th>
            <th>
                Notes
            </th>
            <th>
                {'Interested Status '}
                <FilterMenu>
                    <form onSubmit={form.onSubmit(onSave)}>
                        <Box my='md' sx={{ color: '#1B2559' }}>
                            <Select
                                data={Utilities.mapEnumToSelectFields(InterestStatus)}
                                clearable
                                {...form.getInputProps('interestStatus')}
                            />
                            <Space h="sm" />

                            <Button
                                type='submit'
                                variant='filled'
                                color='yellow'
                                fullWidth={true}
                            >
                                Apply
                            </Button>
                        </Box>
                    </form>
                </FilterMenu>
            </th>
            <th>
                {'Interested In '}
            </th>
            <th>
                {'Status '}
                <FilterMenu>
                    <form onSubmit={form.onSubmit(onSave)}>
                        <Box my='md' sx={{ color: '#1B2559' }}>
                            <Select
                                searchable
                                data={Utilities.mapEnumToSelectFields(CallStatus)}
                                clearable
                                {...form.getInputProps('status')}
                            />
                            <Space h="sm" />
                            <Button
                                type='submit'
                                variant='filled'
                                color='yellow'
                                fullWidth={true}
                            >
                                Apply
                            </Button>
                        </Box>
                    </form>
                </FilterMenu>
            </th>
            <th>
                {'Grade '}
                <FilterMenu>
                    <form onSubmit={form.onSubmit(onSave)}>
                        <Box my='md' sx={{ color: '#1B2559' }}>
                            <TextInput
                                {...form.getInputProps('grade')}
                            />
                            <Space h="sm" />
                            <Button
                                type='submit'
                                variant='filled'
                                color='yellow'
                                fullWidth={true}
                            >
                                Apply
                            </Button>
                        </Box>
                    </form>
                </FilterMenu>
            </th>
            <th>
                Board
            </th>
            <th>
                {'Agent '}
                <FilterMenu>
                    <form onSubmit={form.onSubmit(onSave)}>
                        <Box my='md' sx={{ color: '#1B2559' }}>
                            <Select
                                searchable
                                data={agents.map((agent) => agent.email)}
                                clearable
                                {...form.getInputProps('agentEmail')}
                            />
                            <Space h="sm" />
                            <Button
                                type='submit'
                                variant='filled'
                                color='yellow'
                                fullWidth={true}
                            >
                                Apply
                            </Button>
                        </Box>
                    </form>
                </FilterMenu>
            </th>

            <th>
                {'Date '}
                <FilterMenu>
                    <form onSubmit={form.onSubmit(onSave)}>
                        <Box>
                            <DateInput
                                valueFormat="YYYY-MM-DD"
                                label={<span style={{ color: '#1B2559' }}>Date From</span>}
                                clearable
                                maxDate={new Date()}
                                {...form.getInputProps('date')}
                            />
                            <Space h="sm" />
                            <Button
                                type='submit'
                                variant='filled'
                                color='yellow'
                                fullWidth={true}
                            >
                                Apply
                            </Button>
                        </Box>
                    </form>
                </FilterMenu>
            </th>
            <th>

            </th>
            <th>

            </th>
        </tr>
        // </form>
    }, [agents, form])

    const campaignBucketCallTableProps = useMemo<
        PaginatedTableProps<CampaignBucketCall>
    >(
        () => ({
            renderHeader,
            data: calls,
            render: (call) => {
                return (
                    <tr>
                        <td className={classes.cell}>{`${call.fName} ${call.lName}`}</td>

                        <td className={classes.cell}>{call.number}</td>
                        <td className={classes.cell}>
                            <Select
                                value={call?.phoneType}
                                onChange={(val) => {
                                    dispatch(updateBucketCall({ id: call.id, agentID: user?.email, phoneType: val as PhoneType }))
                                }}
                                sx={{ width: '150px' }}
                                variant="filled"
                                color="dark"
                                radius="md"
                                placeholder="Choose type"
                                data={Utilities.mapEnumToSelectFields(PhoneType)}
                                styles={(theme) => ({
                                    item: {
                                        '&[data-selected]': {
                                            '&, &:hover': {
                                                backgroundColor:
                                                    theme.colorScheme === 'dark'
                                                        ? theme.colors.yellow[7]
                                                        : theme.colors.yellow[1],
                                                color:
                                                    theme.colorScheme === 'dark'
                                                        ? theme.white
                                                        : theme.colors.yellow[7],
                                            },
                                        },
                                    },
                                })}
                            />
                        </td>
                        <td className={classes.cell}>
                            <Select
                                value={call.isTuition ? 'Yes' : 'No'}
                                onChange={(val) => {
                                    const updatedCall = structuredClone(
                                        call
                                    ) as CampaignBucketCall
                                    dispatch(updateBucketCall({ id: call.id, agentID: user?.email, isTuition: val === 'Yes' }))
                                }}
                                variant="filled"
                                color="dark"
                                radius="md"
                                sx={{ width: '80px' }}
                                styles={(theme) => ({
                                    item: {
                                        '&[data-selected]': {
                                            '&, &:hover': {
                                                backgroundColor:
                                                    theme.colorScheme === 'dark'
                                                        ? theme.colors.yellow[7]
                                                        : theme.colors.yellow[1],
                                                color:
                                                    theme.colorScheme === 'dark'
                                                        ? theme.white
                                                        : theme.colors.yellow[7],
                                            },
                                        },
                                    },
                                })}
                                data={[
                                    { value: 'Yes', label: 'Yes' },
                                    { value: 'No', label: 'No' },
                                ]}
                            />
                        </td>
                        <td className={classes.cell}>
                            <Group position="apart">
                                <Text truncate>
                                    {(call?.notes?.length ?? 0) > 20
                                        ? `${call?.notes?.slice(0, 40)}...`
                                        : call?.notes}
                                </Text>
                                <Box sx={{ cursor: 'pointer' }}>
                                    <IconPencil
                                        size={15}
                                        color="#1B2559"
                                        onClick={() => {
                                            setCampaignBucketCall(call)
                                            setIsNotesModalOpen(true)
                                        }}
                                    />
                                </Box>
                            </Group>
                        </td>
                        <td className={classes.cell}>
                            <Select
                                value={call?.interestStatus}
                                onChange={(val) => {
                                    dispatch(updateBucketCall({ id: call.id, agentID: user?.email, interestStatus: val as InterestStatus }))
                                }}
                                sx={{ width: '150px' }}
                                variant="filled"
                                color="dark"
                                radius="md"
                                placeholder="Choose Interst Status"
                                data={Utilities.mapEnumToSelectFields(InterestStatus)}
                                styles={(theme) => ({
                                    item: {
                                        '&[data-selected]': {
                                            '&, &:hover': {
                                                backgroundColor:
                                                    theme.colorScheme === 'dark'
                                                        ? theme.colors.yellow[7]
                                                        : theme.colors.yellow[1],
                                                color:
                                                    theme.colorScheme === 'dark'
                                                        ? theme.white
                                                        : theme.colors.yellow[7],
                                            },
                                        },
                                    },
                                })}
                            />
                        </td>
                        <td className={classes.cell}>{`${call.interestedIn}`}</td>
                        <td className={classes.cell}>
                            <Select
                                value={call?.status}
                                onChange={(val) => {
                                    dispatch(updateBucketCall({ id: call.id, agentID: user?.email, status: val as CallStatus }))
                                }}
                                variant="filled"
                                radius="md"
                                sx={{ width: '150px' }}
                                styles={(theme) => ({
                                    item: {
                                        '&[data-selected]': {
                                            '&, &:hover': {
                                                backgroundColor:
                                                    theme.colorScheme === 'dark'
                                                        ? theme.colors.yellow[7]
                                                        : theme.colors.yellow[1],
                                                color:
                                                    theme.colorScheme === 'dark'
                                                        ? theme.white
                                                        : theme.colors.yellow[7],
                                            },
                                        },
                                    },
                                })}
                                data={Utilities.mapEnumToSelectFields(CallStatus).filter((val) => val.value !== 'UNKNOWN')}


                            />
                            {/* <Badge
                                variant="outline"
                                color={statusColour[call.status ?? Enums.callStatus.UNKNOWN]}
                                className={classes.status}
                            >
                                {call.status}
                            </Badge> */}
                        </td>
                        <td className={classes.cell}>{`${call.grade}`}</td>
                        <td style={{ width: '160px' }}>
                            <Select
                                value={call?.board}
                                onChange={(val) => {

                                    dispatch(updateBucketCall({ id: call.id, agentID: user?.email, board: val as string }))
                                }}
                                variant="filled"
                                color="dark"
                                radius="md"
                                sx={{ width: '150px' }}
                                styles={(theme) => ({
                                    item: {
                                        '&[data-selected]': {
                                            '&, &:hover': {
                                                backgroundColor:
                                                    theme.colorScheme === 'dark'
                                                        ? theme.colors.yellow[7]
                                                        : theme.colors.yellow[1],
                                                color:
                                                    theme.colorScheme === 'dark'
                                                        ? theme.white
                                                        : theme.colors.yellow[7],
                                            },
                                        },
                                    },
                                })}
                                data={[
                                    { value: 'Sindh Board', label: 'Sindh Board' },
                                    { value: 'Punjab Board', label: 'Punjab Board' },
                                    { value: 'Balochistan Board', label: 'Balochistan Board' },
                                ]}
                            />
                        </td>
                        <td className={classes.cell}>{call.agentID}</td>
                        <td className={classes.cell}>{call.createdAt.toDateString()}</td>
                        <td style={{ width: '100px' }}>
                            <Button
                                color="yellow"
                                radius="md"
                                size="xs"
                                leftIcon={<IconPhone size={18} />}
                                disabled={
                                    (selectedCall && selectedCall?.id !== call?.id) ||
                                    ![
                                        Enums.callStatus.PENDING.toString(),
                                        Enums.callStatus.COMPLETED.toString(),
                                    ].includes(call?.status ?? '')
                                }
                                onClick={() => {
                                    console.log('The User: ', { user })

                                    if (!user?.email) {
                                        alert('Unable to start call! Email not found')
                                        return
                                    }

                                    console.log('id', call?.id)
                                    console.log('bucket_id', bucket?.id)
                                    console.log('Emitting Event Start')

                                    socket?.emit('place_call', {
                                        bucketID: bucket?.id,
                                        callID: call?.id,
                                        email: user.email,
                                        number: call?.number,
                                    })
                                    console.log('Emitting Done')
                                    setSelectedCall(call as CampaignBucketCall)
                                    setIsModalOpen(true)
                                    setCallerName(`${call?.fName} ${call.lName}` ?? '')
                                    setPhoneNumber(call?.number ?? '')
                                    setCurrentCallID(call?.id ?? '')
                                }}
                            >
                                {call?.status === Enums.callStatus.PENDING ? 'Call' : 'Redial'}
                            </Button>
                        </td>
                        <td style={{ width: '100px' }}>
                            <Button
                                color="teal"
                                size="xs"
                                component="a"
                                target="_blank"
                                href={`https://wa.me/${call?.number}`}
                                radius="md"
                                leftIcon={<IconBrandWhatsapp />}
                            >
                                Whatsapp
                            </Button>
                        </td>
                    </tr>
                )
            },
            onPageChange: (pageNumber) => {
                loadData({ ...router.query, pageNumber, pageSize: DEFAULT_PAGE_SIZE, cohortID: bucket?.id as string })
            }
        }),
        [renderHeader, calls, classes.cell, classes.status, selectedCall, dispatch, user, bucket?.id, socket, loadData, router.query]
    )

    const isFilterApplied = useMemo(() => Object.keys(router.query).length !== 0, [router.query])

    return (
        <div style={{ margin: 10 }}>
            <span style={{ color: 'darkgreen', textAlign: 'center' }}>
                {!socket?.disconnected ? 'Connected' : 'Disconnected'}
            </span>
            <Box sx={{ display: 'flex', justifyContent: 'right', paddingRight: '5rem', paddingBottom: '1rem' }}>
                <Button color="yellow" sx={{ width: '13rem' }} onClick={() => setIsFilterModalOpen(true)}>
                    {isFilterApplied ? 'Modify Filter' : 'Add Filter'}
                </Button>
                {isFilterApplied &&
                    <Button
                        ml='1rem'
                        sx={{ width: '13rem' }}
                        variant='outline'
                        color='dark'
                        fullWidth={true}
                        onClick={() => router.push('/agent')}
                    >
                        Clear Filter
                    </Button>
                }
            </Box>
            {isLoading ? <Box ta='center' mt='lg'><Loader color='yellow' variant='dots' size='xl' /></Box> :
                <PaginatedTable {...campaignBucketCallTableProps} />}
            {isModalOpen && selectedCall && (
                <AgentCallDialog
                    number={phoneNumber}
                    student={callerName}
                    call={selectedCall}
                    onClose={() => {
                        setSelectedCall(null)
                        setIsModalOpen(false)
                    }}
                />
            )}
            {isNotesModalOpen && campaignBucketCall && (
                <AgentModal
                    isOpen={isNotesModalOpen}
                    setIsOpen={setIsNotesModalOpen}
                    call={campaignBucketCall}
                />
            )}
            {isFilterModalOpen && (
                <FilterModal
                    isOpen={isFilterModalOpen}
                    setIsOpen={setIsFilterModalOpen}
                />
            )}
        </div>
    )
}
