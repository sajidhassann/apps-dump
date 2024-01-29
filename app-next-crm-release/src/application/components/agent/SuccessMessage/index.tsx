import { Text, Center, Stack } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'

export function SuccessMessage() {
    return <Stack align={'center'} justify={'center'}>
        <IconCheck />
        <Text> Data Submitted Successfully </Text>
    </Stack>
}
