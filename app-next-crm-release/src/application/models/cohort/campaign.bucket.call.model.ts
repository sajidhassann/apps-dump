import { CallStatus } from '@/application/constants/enums/callStatus'
import { InterestStatus } from '@/application/constants/enums/interest.status'
import { PhoneType } from '@/application/constants/enums/phone.type'
import { DialerTags } from '@/application/constants/enums/dialer.tags.enum'

export class CampaignBucketCall {
    id: string
    fName: string
    lName: string
    cohortID: string
    notes?: string
    interestedIn?: string
    interestStatus?: InterestStatus
    number: string
    isTuition?: boolean
    phoneType?: PhoneType
    board?: string
    grade?: string
    tags?: DialerTags[]
    status?: CallStatus
    agentID?: string
    createdAt: Date

    constructor(data: CampaignBucketCall) {
        this.id = data.id ?? ''
        this.fName = data.fName ?? ''
        this.lName = data.lName ?? ''
        this.cohortID = data.cohortID ?? ''
        this.notes = data.notes ?? ''
        this.interestedIn = data.interestedIn ?? ''
        this.interestStatus = data.interestStatus
        this.phoneType = data.phoneType
        this.number = data.number ?? ''
        this.grade = data.grade ?? ''
        this.board = data.board
        this.tags = data.tags ?? []
        this.isTuition = data.isTuition
        this.status = data.status
        this.agentID = data.agentID
        this.createdAt = new Date(data.createdAt)
    }
}
