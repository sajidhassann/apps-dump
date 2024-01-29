import { TicketStatus } from '@/application/constants/enums/ticket.status.enum'
import { TicketTag } from '@/application/constants/enums/ticket.tag.enum'
import { CRM_API_URL } from '@/application/constants/urls'
import { useAppDispatch } from '@/application/redux/hooks'
// import { updateCurrentChat } from '@/application/redux/states/agent/ticket'
import { Box, Button, Group, Modal, MultiSelect, Select, } from '@mantine/core'

import { useForm } from '@mantine/form'
import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'

interface ITicketDetailsModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	currentChat: any;
}

export default function TicketDetailsModal({
	isOpen,
	setIsOpen,
	currentChat,
}: ITicketDetailsModalProps) {


	console.log('currentChat :>> ', currentChat?.tags)

	const dispatch = useAppDispatch()

	const form = useForm({
		initialValues: {
			status: currentChat?.status ?? '',
			tags: currentChat?.tags ?? [],
		},
	})

	const onTicketStatusChangeHandler = async (values: any) => {

		console.log('values :>> ', values)
		console.log('currentChat :>> ', currentChat)

		const requestBody = {
			...currentChat,
			status: values.status,
			tags: values.tags,
			mode: 'AGENT',
		}

		delete requestBody.createdAt

		console.log('requestBody :>> ', requestBody)

		const response = await axios.patch(
			`${CRM_API_URL}/agent/ticket`,
			requestBody
		)

		// dispatch(updateCurrentChat({ tags: values.tags, status: values.status }))

		setIsOpen(false)


	}

	const [searchValue, onSearchChange] = useState('')

	return (
		<>
			<Modal
				opened={isOpen}
				onClose={() => setIsOpen(false)}
				title={<div style={{ color: '#1B2559' }}>Ticket # {currentChat.id}</div>}
				// sx={{ color: '#1B2559' }}
			>
				<form onSubmit={form.onSubmit((values) => {
					console.log('values :>> ', values)
					onTicketStatusChangeHandler(values).finally()
				})}>
					<Box sx={{ margin: '10px' }}>
						<Select
							data={Object.keys(TicketStatus).filter((val) => val !== TicketStatus.UNREAD)}
							placeholder={currentChat.status}
							label="Ticket Status"
							{...form.getInputProps('status')}
						/>
					</Box>
					<Box sx={{ margin: '10px' }}>
						<MultiSelect
							data={Object.keys(TicketTag).map((val) => val)}
							label="Tags"
							searchable
							searchValue={searchValue}
							onSearchChange={onSearchChange}
							nothingFound="Nothing found"
							placeholder="Pick all that you like"
							{...form.getInputProps('tags')}
						/>
					</Box>
					<Group mt="xl" position="right">
						<Button
							variant="filled"
							type="submit"
							disabled={(!form.values.status)}
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
							Save
						</Button>
					</Group>
				</form>
			</Modal>
		</>
	)
}
