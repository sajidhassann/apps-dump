import { Button, Grid, Paper } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import React from 'react'

export interface MediaData {
	id: string;
	url: string;
	mimeType: string;
}

interface MediaSelectorProps {
	media: MediaData[];
	onSelect: (selectedMedia: MediaData[]) => void;
}

export const MediaSelector: React.FC<MediaSelectorProps> = ({ media, onSelect }) => {
	const [selectedMedia, { setState: setSelectedMedia }] = useListState<MediaData>([])

	const handleSelect = (item: MediaData) => {
		if (selectedMedia.some((selected) => selected.id === item.id))
			setSelectedMedia((prev) => prev.filter((selected) => selected.id !== item.id))
		else
			setSelectedMedia((prev) => [...prev, item])

	}

	const isImage = (mimeType: string) => mimeType.startsWith('image/') || mimeType ==="image"

	return (
		<div>
			<Grid gutter="md">
				{media.map((item) => (
					<Grid.Col span={6}>
						<Paper
							p="sm"
							m="md"
							shadow="xs"
							onClick={() => handleSelect(item)}
							style={{
								cursor: 'pointer',
								borderWidth: selectedMedia.some((selected) => selected.id === item.id) ? 3 : 0,
								borderColor: 'blue',
								borderStyle: 'solid',
							}}
						>
							{isImage(item.mimeType) ? (
								<img
									src={item.url}
									alt=""
									style={{
										width: '100%',
										height: 200,
										objectFit: 'contain',
									}}
								/>
							) : (
								<video
									src={item.url}
									style={{
										width: '100%',
										height: 200,
										objectFit: 'cover',
									}}
									controls
								/>
							)}
						</Paper>
					</Grid.Col>
				))}
			</Grid>
			<Button onClick={() => onSelect(selectedMedia)} style={{ marginTop: '1rem', color: 'black' }}>
				Select Media
			</Button>
		</div>
	)
}