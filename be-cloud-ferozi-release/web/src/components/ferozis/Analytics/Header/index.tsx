import { Group, Select, Stack, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { Ferozi } from '@/src/application/redux/features/ferozis/models/ferozi';

export interface HeaderProps {
    selectedFeroziID: string | null
    selectedFeroziName: string | null
    ferozis: Ferozi[]
}

export function Header(props: HeaderProps) {
    const router = useRouter();

    return (<Group grow px={20} align="flex-start">
        <Stack gap={0}>
            <Text size="sm" c="body">
                Dashboard
            </Text>
            <Title order={2} c="sub-heading">
                {props.selectedFeroziName}
            </Title>
        </Stack>

        <Select
          defaultValue={props.selectedFeroziID}
          miw="200px"
          placeholder="Search or select a ferozi"
          onChange={(val) => {
                if (val != null) router.replace(`analytics?id=${val}`);
            }}
          data={props.ferozis?.map(ferozi => ({
                label: ferozi.name,
                value: ferozi.id,
            }))}
        />
            </Group>);
}
