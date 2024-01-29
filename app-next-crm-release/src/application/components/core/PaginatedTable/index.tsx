import { Pagination as PaginationModel } from '@/application/models/shared/pagination.model'
import { Affix, Group, Pagination, ScrollArea, Space, Table, Text } from '@mantine/core'
import { Fragment, ReactNode } from 'react'
import useStyles from './styles'

export type PaginatedTableProps<T extends { id: string }> = {
    renderHeader: () => ReactNode
    data: PaginationModel<T>;
    render: (item: T) => ReactNode;
    onPageChange: (page: number) => void
};

type Data = { id: string }

export default function PaginatedTable<T extends Data>(props: PaginatedTableProps<T>) {
    const { renderHeader, data, render, onPageChange } = props
    const { classes } = useStyles()

    return (
        <>
            <Affix w={'100%'} bg='white'>
                <Group pb={20} pl={100} pr={40} align='center'>
                    <Text mt="auto">Total: {data.count}</Text>
                    <Group position="right" ml="auto" mt="lg">
                        <Pagination
                            value={data.pageNumber}
                            withEdges total={data.totalPages}
                            color="yellow"
                            radius="lg"
                            onChange={onPageChange} />
                    </Group>
                </Group>
            </Affix>
            <ScrollArea w="90%" mx="auto">
                <Table
                    striped
                    withBorder
                    verticalSpacing="xs"
                    horizontalSpacing="md"
                    className={classes.table}
                >
                    <thead>
                        {renderHeader()}
                    </thead>
                    <tbody style={{ minHeight: '50rem' }}>
                        {data.items.map((item, index) => (
                            <Fragment key={item.id}>{render(item)}</Fragment>
                        ))}
                    </tbody>
                </Table>
                <Space h={80} />
            </ScrollArea>
            {/* <Group w="100%">
                <Text mt="auto">Total: {data.count}</Text>
                <Group position="right" ml="auto" mt="lg">
                    <Pagination
                        value={data.pageNumber}
                        withEdges total={data.totalPages}
                        color="yellow"
                        radius="lg"
                        onChange={onPageChange} />
                </Group>
            </Group> */}
        </>

    )
}
