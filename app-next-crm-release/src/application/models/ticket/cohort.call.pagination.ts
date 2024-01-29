import { CallStatus } from '@/application/constants/enums/callStatus'
import { InterestStatus } from '@/application/constants/enums/interest.status'

interface CohortCallPagination {
    pageSize: number
    pageNumber: number
    cohortID: string
    agentEmail?: string
    date?: string
    interestStatus?: InterestStatus
    number?: string
    grade?: string
    status?: CallStatus
}

export default CohortCallPagination