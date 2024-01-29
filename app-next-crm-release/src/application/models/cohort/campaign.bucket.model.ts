export class CampaignBucket {
    id: string
    name: string
    adminID: string
    type: string
    availability: string
    createdAt: Date

    constructor(data: CampaignBucket) {
        this.id = data.id ?? ''
        this.name = data.name ?? ''
        this.adminID = data.adminID ?? ''
        this.type = data.type ?? ''
        this.availability = data.availability ?? ''
        this.createdAt = new Date(data.createdAt)
    }
}
