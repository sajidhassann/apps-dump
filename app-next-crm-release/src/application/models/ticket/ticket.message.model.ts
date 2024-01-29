import { RecipientType } from '@/application/constants/enums/recipient.type.enum'


export class TicketMessage {
    readonly id: string
    readonly ticketID: string
    readonly recipientID: string
    readonly recipient: string
    readonly content: string
    readonly mediaURL: string
    readonly recipientType: RecipientType
    readonly createdAt: Date
    readonly mimeType?: string
    readonly mime: string

    constructor(data: TicketMessage) {
        this.id = data.id
        this.ticketID = data.ticketID
        this.recipientID = data.recipientID
        this.recipientType = data.recipientType
        this.recipient = this.recipientType === RecipientType.AGENT ? this.recipientID : ''
        this.content = data.content ?? ''
        this.mediaURL = data.mediaURL ?? ''
        this.mimeType = data.mimeType ?? ''
        this.mime = this.mimeType?.split('/')[0]
        this.createdAt = new Date(data.createdAt)
    }

    get isUserMessage() {
        return this.recipientType === RecipientType.USER
    }
    
}