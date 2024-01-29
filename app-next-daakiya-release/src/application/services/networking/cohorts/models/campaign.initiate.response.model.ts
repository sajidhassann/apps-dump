export class CampaignInitiateResponseModel {
    readonly id: string
    readonly name: string
    readonly createdAt: string
    readonly updatedAt: string
    readonly status: string

    constructor(data: CampaignInitiateResponseModel) {
        this.id = data.id ?? ''
        this.name = data.name ?? ''
        this.createdAt = data.createdAt ?? ''
        this.updatedAt = data.updatedAt ?? ''
        this.status = data.status ?? ''
    }
}