import { MediaData, MediaSelector } from '@/application/components/core/MediaSelector'
import { CRM_API_URL } from '@/application/constants/urls'
import { Ticket } from '@/application/models/ticket/tickets.model'
import { useAppSelector } from '@/application/redux/hooks'
import { NotionUserNetworkModel } from '@/application/services/networking/models/notion.user.network.model'
import { NotionNetworkManager } from '@/application/services/networking/notion'
import { Button, Group, Loader, Modal, MultiSelect, Select, Table, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'


interface IReportBugModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	currentChat?: Ticket;
	messages: MediaData[];
}

export default function ReportBugModal({
	isOpen,
	setIsOpen,
	currentChat,
	messages,
}: IReportBugModalProps) {

	const { user } = useAppSelector(state => state.auth)

	const [searchValue, onSearchChange] = useState('')
	const [notionUsers, setNotionUsers] = useState<{value: string, label: string}[]>([])
	const [ticketMedia, setTicketMedia] = useState<string[]>([])
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	const form = useForm({
		initialValues: {
			title: '',
			studentNumber: `+${currentChat?.number}` ?? '',
			priority: '',
			appVersion: '',
			teams: '',
			type: '',
			agentEmail: user?.email ?? 'aliya@maqsad.io',
			assigneeIDs: [],
			errorDetails: {
				message: '',
				mediaUrls: []
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


		console.log('Request Body: ', values)

		const response = await axios.post(
			`${CRM_API_URL}/notion/complaint`,
			values
		)

		setIsSubmitting(false)
		setIsOpen(false)


	}

	const handleMediaSelect = (selectedMedia: MediaData[]) => {
		console.log('Selected media for ticket:', selectedMedia)
		setTicketMedia(selectedMedia.map(media => media.url))
	}

	useEffect(() => {
		if (notionUsers.length === 0)
			{
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
			<Modal
				opened={isOpen}
				onClose={() => setIsOpen(false)}
				title={<div style={{ color: '#1B2559', fontSize: '1.2rem' }}>Report Bug For Ticket # {currentChat?.id}</div>}
				color='#1B2559'
				centered size="lg"
			>
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
												label: 'Fatt Gaya!!!',
												value: 'Fatt Gaya!!!',
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
								<MediaSelector media={messages} onSelect={handleMediaSelect} />
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
							disabled={isSubmitting}
						>
							{ isSubmitting && <Loader size="sm" color="white" /> }
							Report Bug
						</Button>
					</Group>
				</form>
			</Modal>
		</>
	)
}