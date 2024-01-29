import { Divider, Grid, Group, Text, useMantineTheme } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import Image from 'next/image'

interface MacroTabProps {
    macro: any,
    onDelete: () => void
    onEdit: () => void
}

export const MacroTab = (props: MacroTabProps) => {
    const { macro, onDelete, onEdit } = props
    const theme = useMantineTheme()

    return (
        <>
            <Grid.Col p={0} m={0}>
                <Divider size={0.5} />
                <Group position='apart' spacing={0} pl={60} pr={24} pt={0} pb={0}>
                    <Group>
                        <Text fz="sm" color={theme.black} weight={700}>
                            {macro.title}
                        </Text>
                    </Group>
                    <Group>
                        <Image
                            alt="filter"
                            src="/assets/icons/edit-button.svg"
                            className="pointer"
                            width={60}
                            height={60}
                            onClick={onEdit}
                        />
                        <IconTrash size={20} strokeWidth={1} color='red' cursor="pointer" onClick={onDelete} />
                    </Group>
                </Group>
            </Grid.Col>
        </>
    )
}

export default MacroTab
