import { Group, ScrollArea, Stack, Text, useMantineTheme } from '@mantine/core'
import { Dropzone, FileWithPath } from '@mantine/dropzone'
import { IconFile, IconFileUpload, IconUpload, IconX } from '@tabler/icons-react'
import { Dispatch, ReactNode, SetStateAction } from 'react'

type DropZoneProps = {
	allowedMimeTypes: string[]
	files: FileWithPath[]
	setFiles: Dispatch<SetStateAction<FileWithPath[]>>
	previews?: ReactNode
	maxFileSize?: string,
	scrollAreaHeight?: number,
}

export default function DropZone( props: DropZoneProps ) {
	const {
		allowedMimeTypes,
		files,
		setFiles,
		// previews,
		maxFileSize = '5 MB',
		scrollAreaHeight = 150,
	} = props

	const theme = useMantineTheme()

	const renderPreviews = files.map( ( file, index ) => {
		const imageUrl = URL.createObjectURL( file )

		return (
			<Group
				key={ `${ file.name }-${ index }` }
				spacing="xs"
				noWrap
			>
				<IconFile
					size="1.5rem"
					stroke={ 1.5 }
					color={ theme.colors.dark[theme.colorScheme === 'dark' ? 2 : 6] }
				/>

				<Text truncate w="30ch">{ file.name }</Text>

				<IconX
					size="1.5rem"
					stroke={ 1.5 }
					color={ theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6] }
					className="cursor-pointer"
					onClick={ () => {
						const newFiles = files.filter( ( f, i ) => i !== index )
						setFiles( newFiles )
					} }
				/>
			</Group>
		)
	} )

	return (
		<div>
			<Dropzone
				accept={ allowedMimeTypes }
				onDrop={ setFiles }
				sx={ ( theme ) => ({
					minHeight: '12rem',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}) }
			>
				<Group
					position="center"
					spacing="xs"
					noWrap
				>
					<Dropzone.Accept>
						<IconUpload
							size="8rem"
							stroke={ 1.5 }
							color={ theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6] }
						/>
					</Dropzone.Accept>

					<Dropzone.Reject>
						<IconX
							size="8rem"
							stroke={ 1.5 }
							color={ theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6] }
						/>
					</Dropzone.Reject>

					<Dropzone.Idle>
						<IconFileUpload size="8rem" stroke={ 1.5 } />
					</Dropzone.Idle>

					<div>
						<Text
							size="md"
							inline
						>
							Drag and drop files you want to upload here, or <span className="font-medium">click here</span> to open
							your
							system file
							explorer
						</Text>

						<Text
							size="sm"
							color="dimmed"
							inline
							mt={ 10 }
						>
							Maximum file size: { maxFileSize }
						</Text>
					</div>
				</Group>
			</Dropzone>

			<ScrollArea
				mt={ 24 }
				scrollbarSize={ 10 }
				h={ scrollAreaHeight }
			>
				<Stack spacing="lg" mb={ 20 }>
					{ renderPreviews }
				</Stack>
			</ScrollArea>
		</div>
	)
}
