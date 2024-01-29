import { Pagination as PaginationModel } from '@application/models/shared/pagination.model'
import { Group, Pagination, ScrollArea, Table } from '@mantine/core'
import { Fragment, ReactNode } from 'react'
import useStyles from './styles'

export type PaginatedTableProps<T> = {
  columns: string[];
  data: PaginationModel<T>;
  render: (item: T) => ReactNode;
  onPageChange: (page: number) => void;
};

export default function PaginatedTable<T>(props: PaginatedTableProps<T>) {
    const { columns, data, render, onPageChange } = props
    const { classes } = useStyles()

    return (
        <ScrollArea w="90%" mx="auto">
            <Table
                striped
                withBorder
                verticalSpacing="xs"
                horizontalSpacing="md"
                className={classes.table}
            >
                <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.items.map((item, index) => (
                    <Fragment key={index}>{render(item)}</Fragment>
                ))}
                </tbody>
            </Table>
            <Group position="right" mt="lg">
                <Pagination
                    value={data.pageNumber}
                    withEdges total={data.totalPages}
                    color="yellow"
                    radius="lg"
                    onChange={onPageChange}/>
            </Group>
        </ScrollArea>
    )
}
