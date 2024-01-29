import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { setFilters } from '@/application/redux/states/agent/ticket'
import { ITicketState } from '@/application/redux/states/agent/ticket/types'
import { TextInput } from '@mantine/core'
import { ChangeEvent, useCallback } from 'react'

const SearchInput = () => {

    const dispatch = useAppDispatch()
    const { filters }: ITicketState = useAppSelector(
        (state) => state.ticket
    )

    const onChangeInputText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const filtersClone = structuredClone(filters)
        filtersClone.search = event.target.value
        dispatch(setFilters(filtersClone))
    }, [dispatch, filters])
    return <TextInput
    placeholder="Search by Phone Number"
    w="75%"
    radius="md"
    value={filters.search}
    onChange={onChangeInputText}
/>
}
export default SearchInput