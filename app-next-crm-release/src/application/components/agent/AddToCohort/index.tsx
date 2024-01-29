import { CRM_API_URL } from '@/application/constants/urls'
import { Box, Button, Group, Modal, Select, TextInput, } from '@mantine/core'

import { useForm } from '@mantine/form'
import axios from 'axios'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { loadBuckets } from '@/application/redux/networkThunk/agent/campaignBucket'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { ICampaignBucketState } from '@/application/redux/states/agent/campaignBucket/types'
import { Ticket } from '@/application/models/ticket/tickets.model'

interface IAddToCohortModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	currentChat?: Ticket;
}

export default function AddToCohortModal({
	isOpen,
	setIsOpen,
	currentChat,
}: IAddToCohortModalProps) {

	const { buckets }: ICampaignBucketState = useAppSelector(state => state.campaignBucket)
	const form = useForm({
		initialValues: {
			fName: currentChat?.username?.split?.(' ')?.[0] ?? '',
			lName: currentChat?.username?.split?.(' ')?.[1] ?? '',
			number: `+${currentChat?.number}`,
			interestedIn: '',
			cohortID: '',
		},
	})

	const onAddCohortCall = async (values: any) => {


		console.log('requestBody :>> ', values)

		const response = await axios.post(
			`${CRM_API_URL}/agent/cohort-call`,
			values
		)

		setIsOpen(false)


	}
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (buckets.length === 0)
			dispatch(loadBuckets())
	}, [])


	return (
		<>
			<Modal
				opened={isOpen}
				onClose={() => setIsOpen(false)}
				title={<div style={{ color: '#1B2559' }}>Ticket # {currentChat?.id}</div>}
                color='#1B2559' 
			>
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
							data={buckets.map((bucket)=>({ value: bucket.id, label: bucket.name }))}
							label="Cohort"
							required
							{...form.getInputProps('cohortID')}
						/>
					</Box>
					<Group mt="xl" position="right">
						<Button
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
			</Modal>
		</>
	)
}
