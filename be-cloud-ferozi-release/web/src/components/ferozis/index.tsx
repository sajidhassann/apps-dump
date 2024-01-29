import { ActionIcon, Anchor, Button, Center, Group, Stack, Switch, Table, Text, Title, Tooltip } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdContentCopy } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { format, parseISO } from 'date-fns';
import PaginatedTable, { PaginatedTableProps } from '../core/PaginatedTable';
import { Ferozi } from '@/src/application/redux/features/ferozis/models/ferozi';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import {
    changeFeroziStatus,
    IFerozisState,
    listFerozis,
    manageFerozi,
    setCurrentFerozi,
} from '@/src/application/redux/features/ferozis';

export function Ferozis() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(listFerozis());
    }, []);

    const { ferozis }: IFerozisState = useAppSelector<IFerozisState>((state) => state.ferozi);

    const router = useRouter();

    const onClick = () => {
        dispatch(setCurrentFerozi(undefined));
        router.push('/admin/ferozis/manage');
    };

    const onClickEdit = (ferozi: Ferozi) => {
        dispatch(setCurrentFerozi(ferozi));
        router.push('/admin/ferozis/manage');
    };

    const onStatusChange = async (ferozi: Ferozi) => {
        const updatedFerozi = {
            ...ferozi,
            isActive: !ferozi.isActive,
        };
        await dispatch(manageFerozi({
            id: ferozi.id,
            isActive: !ferozi.isActive,
        }))
            .unwrap();
        dispatch(changeFeroziStatus(updatedFerozi));
    };

    const feroziTableData = useMemo<PaginatedTableProps<Ferozi>>(
        () => ({
            columns: ['Name', 'Created At', 'Status', ''],
            items: ferozis ?? [],
            render: (ferozi) => (
                <Table.Tr>
                    <Table.Td><Group
                      justify="space-between"
                    >
                        <Anchor
                          c="black"
                          onClick={() => {
                                router.push(`/admin/ferozis/analytics?id=${ferozi.id}`);
                            }}
                        >
                            {ferozi.name}
                        </Anchor>
                        <Tooltip
                          label="Copy ID to clipboard"
                        ><ActionIcon
                          variant="subtle"
                          color="yellow"
                          size="xs"
                          onClick={async () => {
                                await navigator.clipboard.writeText(ferozi.id);
                            }}
                        >
                            <MdContentCopy />

                         </ActionIcon>
                        </Tooltip>
                              </Group>
                    </Table.Td>

                    <Table.Td>{format(parseISO(ferozi.createdAt), 'do MMM, yyyy')}</Table.Td>
                    <Table.Td>
                        <Switch
                          checked={ferozi.isActive === true}
                          onChange={() => onStatusChange(ferozi)}
                          size="md"
                          color="yellow"
                        />
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <ActionIcon color="yellow" size="xs" onClick={() => onClickEdit(ferozi)}>
                                <CiEdit />
                            </ActionIcon>
                        </Center>
                    </Table.Td>
                </Table.Tr>
            ),
        }),
        [ferozis, dispatch]
    );

    return (
        <Stack align="stretch" px={20}>
            <Group justify="space-between">
                <Title order={2}>
                    Ferozis ⭐
                </Title>
                <Button type="submit" color="yellow" onClick={onClick} leftSection={<FaPlus />}>
                    Create New Ferozi
                </Button>
            </Group>
            <PaginatedTable {...feroziTableData} />
        </Stack>
    );
}
