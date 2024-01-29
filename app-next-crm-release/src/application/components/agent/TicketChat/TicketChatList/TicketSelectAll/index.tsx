import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { ITicketState } from '@/application/redux/states/agent/ticket/types'
import { Checkbox, Group, Text } from '@mantine/core'
import { ChangeEventHandler, useCallback, useMemo } from 'react'
import useStyles from '../styles'
import TicketMenuItems from '../TicketFilterMenu/TicketMenuItems'
import { emptySelectedTickets, selectAllTickets } from '@/application/redux/states/agent/ticket'

const TicketSelectAll = () => {

    const { classes } = useStyles()
    const dispatch = useAppDispatch()
    const {
        showSelectList,
        selectedTickets = {},
        isAllTicketsSelected,
    }: ITicketState = useAppSelector(
        (state) => state.ticket
    )

    const selectedTicketsLen = useMemo(() => Object.keys(selectedTickets).length, [selectedTickets])

    const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
        if (e.target.checked) {
            dispatch(selectAllTickets())
            return
        }
        dispatch(emptySelectedTickets())
    }, [dispatch])

    return showSelectList ? (
        <>
            <Group>
                <Checkbox
                    color="blue"
                    onChange={onChange}
                    indeterminate={isAllTicketsSelected ? undefined : selectedTicketsLen > 0}
                    checked={isAllTicketsSelected}
                />

                <Text className={classes.selectedTickets}>{selectedTicketsLen} Chats Selected</Text>
            </Group>
            <TicketMenuItems/>
        </>
    ) : null
}
export default TicketSelectAll