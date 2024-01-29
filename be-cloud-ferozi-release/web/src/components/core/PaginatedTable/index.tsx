import { Group, Pagination, ScrollArea, Table } from '@mantine/core';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import useStyles from './styles';

export type PaginatedTableProps<T> = {
    columns: string[];
    items: T[];
    render: (item: T) => JSX.Element;
};

export default function PaginatedTable<T>(props: PaginatedTableProps<T>) {
    const PAGE_SIZE = 15;
    const {
        columns,
        items,
        render,
    } = props;
    //   const { classes } = useStyles();

    const [records, setRecords] = useState<T[]>([]);
    const [page, setPage] = useState<number>(1);

    const onPageChangeHandler = useCallback(
        (page: number) => {
            const from = (page - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE;
            setRecords(items.slice(from, to));
        },
        [items]
    );

    const totalPages = useMemo(
        () => Math.ceil(items.length / PAGE_SIZE),
        [items.length]
    );

    useEffect(() => {
        onPageChangeHandler(page);
    }, [items, onPageChangeHandler, page]);

    return (
        <ScrollArea>
            <Table
              withColumnBorders
              withTableBorder
              verticalSpacing="xs"
              horizontalSpacing="md"
                //   className={classes.table}
            >
                <Table.Thead>
                    <Table.Tr>
                        {columns.map((col, index) => (
                            <Table.Th key={index}>{col}</Table.Th>
                        ))}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {records.map((item, index) => (
                        <Fragment key={index}>{render(item)}</Fragment>
                    ))}
                </Table.Tbody>
            </Table>
            <Group justify="end" mt="lg">
                <Pagination
                  value={page}
                  withEdges
                  total={totalPages}
                  color="yellow"
                  radius="lg"
                  onChange={setPage}
                />
            </Group>
        </ScrollArea>
    );
}
