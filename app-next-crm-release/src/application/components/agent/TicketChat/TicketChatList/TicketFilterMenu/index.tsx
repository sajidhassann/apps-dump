import { ActiveTicketStatus, AgentTicketStatus } from '@/application/constants/enums/ticket.status.enum'
import { TicketTab } from '@/application/constants/enums/ticket.tab'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { setFilters } from '@/application/redux/states/agent/ticket'
import { ITicketState } from '@/application/redux/states/agent/ticket/types'
import { Checkbox, Menu } from '@mantine/core'
import Image from 'next/image'

const ticketStatusesMap: { [key: string]: ActiveTicketStatus[] | AgentTicketStatus[] } = {
  [TicketTab.ALL_TICKETS]: Object.values(ActiveTicketStatus),
  [TicketTab.MY_TICKETS]: Object.values(AgentTicketStatus),
  [TicketTab.OTP_TICKETS]: Object.values(ActiveTicketStatus),
}

export default function TicketFilterMenu() {
  const dispatch = useAppDispatch()
  const { filters, activeTab, showTicketTabs }: ITicketState = useAppSelector((state) => state.ticket)

  return showTicketTabs ? (
    <>
      {(activeTab in ticketStatusesMap) && ( <Menu
      shadow="md"
      width={200}
      keepMounted
      closeOnItemClick={false}
      transitionProps={{ transition: 'rotate-right', duration: 150 }}
    >
      <Menu.Target>
        <Image
          alt="filter"
          src="/assets/icons/filter.svg"
          className="pointer"
          width={20}
          height={20}
        />
      </Menu.Target>
      <Menu.Dropdown>
        {ticketStatusesMap[activeTab].map((filter) => (
         // TODO: Mantine not picking colors with different hex codes even if the color is in theme
          <Menu.Item key={filter}>
            <Checkbox
              key={filter}
              name={filter}
              label={filter}
              radius="lg"
              color='blue'
              size="sm"
              onChange={(event) => {
                const filtersClone = structuredClone(filters)
                if (filters.statuses[filter]) 
                    delete filtersClone.statuses[filter]
                 else 
                  filtersClone.statuses[filter] = event.target.checked
                  
                dispatch(setFilters(filtersClone))
              }}
            />
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>) }
    </>
   
  ): null
}
