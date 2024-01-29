import { DEFAULT_PAGE_SIZE } from '@/application/constants'
import { TicketStatus } from '@/application/constants/enums/ticket.status.enum'
import { TicketTab } from '@/application/constants/enums/ticket.tab'
import { Pagination } from '@/application/models/shared/pagination.model'
import { TicketMessage } from '@/application/models/ticket/ticket.message.model'
import { Ticket } from '@/application/models/ticket/tickets.model'
import { User } from '@/application/models/shared/user.model'
import { UserProperties } from '@/application/models/ticket/user.properties.model'

export interface FilterOptions {
    search: string;
    statuses: Partial<Record<TicketStatus, boolean>>;
}

export interface ITicketState {
    unreadTickets: Pagination<Ticket>;
    allTickets: Pagination<Ticket>;
    OTPTickets: Pagination<Ticket>;
    myTickets: Pagination<Ticket>;
    inactiveTickets: Pagination<Ticket>;
    activeTab: TicketTab;
    isLoading: boolean;
    currentTicket?: Ticket;
    messages: TicketMessage[];
    filters: FilterOptions;
    showTicketTabs: boolean
    ticketMessages: TicketMessage[];
    agents: User[];
    showSelectList: boolean;
    selectedTickets: { [p: string]: Ticket };
    isAllTicketsSelected: boolean;
    historyTickets: Ticket[];
    details?: UserProperties;
}

export const defaultState: ITicketState = {
    activeTab: TicketTab.UNREAD_TICKETS,
    unreadTickets: new Pagination<Ticket>({
        count: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        totalPages: 0,
        pageNumber: 1,
        items: [],
    }),
    allTickets: new Pagination<Ticket>({
        count: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        totalPages: 0,
        pageNumber: 1,
        items: [],
    }),
    OTPTickets: new Pagination<Ticket>({
        count: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        totalPages: 0,
        pageNumber: 1,
        items: [],
    }),
    myTickets: new Pagination<Ticket>({
        count: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        totalPages: 0,
        pageNumber: 1,
        items: [],
    }),
    inactiveTickets: new Pagination<Ticket>({
        count: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        totalPages: 0,
        pageNumber: 1,
        items: [],
    }),
    isLoading: false,
    messages: [],
    agents: [],
    filters: {
        search: '',
        statuses: {} as Partial<Record<TicketStatus, boolean>>,
    },
    ticketMessages: [],
    showSelectList: false,
    showTicketTabs: true,
    selectedTickets: {},
    isAllTicketsSelected: false,
    historyTickets: [],
}
