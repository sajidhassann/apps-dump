import { Ticket } from '@/application/models/ticket/tickets.model'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { toggleSelectedTicket } from '@/application/redux/states/agent/ticket'
import { ITicketState } from '@/application/redux/states/agent/ticket/types'
import { Checkbox } from '@mantine/core'
import { FC, useCallback } from 'react'

type CardCheckboxProps = {
    ticket: Ticket
}
const CardCheckbox: FC<CardCheckboxProps> = (props) => {
    const { ticket } = props
    const { showSelectList, selectedTickets }: ITicketState = useAppSelector((state) => state.ticket)
    const dispatch = useAppDispatch()

    const onChange = useCallback(()=>{
        dispatch(toggleSelectedTicket(ticket))
    },[ticket, dispatch])

    return <>
        { showSelectList && 
            <Checkbox
                my='sm'
                color="blue"
                radius="lg"
                size="sm" 
                checked={ticket.id in selectedTickets}
                disabled={ticket.isDisabled}
                onChange={onChange}
                onClick={(e)=>{e.stopPropagation()}}
            /> 
        }
    </>
}

export default CardCheckbox