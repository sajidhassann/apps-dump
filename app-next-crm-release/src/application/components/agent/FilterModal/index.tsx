import { Box, Button, Group, Modal, Select, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/application/redux/hooks'
import { User } from '@/application/models/shared/user.model'
import { InterestStatus } from '@/application/constants/enums/interest.status'
import Utilities from '@/application/utils'
import { CallStatus } from '@/application/constants/enums/callStatus'

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;    
};

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


export default function FilterModal(props: Props) {
    const { isOpen, setIsOpen } = props
    const form = useForm<FormValues>()
    const router = useRouter()
    const agents: User[] = useAppSelector((state) => state.ticket.agents)

    useEffect(() => {
        if (router.query) {
            form.setValues({
                agentEmail: router.query.agentEmail as string || undefined,
                date: router.query.date ? new Date(router.query.date as string) : undefined,
                interestStatus: router.query.interestStatus as InterestStatus || undefined,
                number: router.query.number as string || undefined,
                status: router.query.status as CallStatus || undefined,
                grade: router.query.grade as string || undefined,
            })
        }
    }, [router.query])


    const onSave = useCallback((values: typeof form.values) => {

        const { agentEmail, date, interestStatus, number, status, grade} = values
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
        })

        setIsOpen(false)
    }, [form, router, setIsOpen])

    return (
        <>
            <Modal
                opened={isOpen}
                onClose={() => setIsOpen(false)}
                title={<div style={{ color: '#1B2559' }}>Filter</div>}
            >
                <form
                    onSubmit={form.onSubmit(onSave)}
                    onReset={form.onReset}
                >
                    <Box>
                        <DateInput
                            valueFormat="YYYY-MM-DD"
                            label={<span style={{ color: '#1B2559' }}>Date From</span>}
                            clearable
                            maxDate={new Date()}
                            {...form.getInputProps('date')}
                        />
                    </Box>
                    <Box my='md' sx={{ color: '#1B2559' }}>
                        <Select
                            data={Utilities.mapEnumToSelectFields(InterestStatus)}
                            label={<span style={{ color: '#1B2559' }}>Interest Status</span>}
                            clearable
                            {...form.getInputProps('interestStatus')}
                        />
                    </Box>
                    <Box my='md' sx={{ color: '#1B2559' }}>
                        <Select
                            data={agents.map((agent) => agent.email)}
                            label={<span style={{ color: '#1B2559' }}>Agent</span>}
                            clearable
                            {...form.getInputProps('agentEmail')}
                        />
                    </Box>
                    <Box my='md' sx={{ color:  '#1B2559' }}>
                        <TextInput
                        label={<span style={{ color: '#1B2559' }}>Phone Number</span>}
                        {...form.getInputProps('number')}
                        />
                    </Box>
                    <Box my='md' sx={{ color: '#1B2559' }}>
                        <TextInput
                            label={<span style={{ color: '#1B2559' }}>Grade</span>}
                            {...form.getInputProps('grade')}
                        />
                    </Box>
                    <Box my='md' sx={{ color: '#1B2559' }}>
                        <Select
                            data={Utilities.mapEnumToSelectFields(CallStatus)}
                            label={<span style={{ color: '#1B2559' }}>Call Status</span>}
                            clearable
                            {...form.getInputProps('status')}
                        />
                    </Box>
                    <Group mt="5rem" position="center">
                        <Button
                            type='submit'
                            variant='filled'
                            color='yellow'
                            fullWidth={true}
                            >
                            Apply
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    )
}
