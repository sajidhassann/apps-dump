export type campaignCohort = {
    campaignID: string,
    cohortID: string
}


export default class CampaignAllData {
    id: string
    name: string
    notificationMetaID: string
    status: string
    createdAt: Date
    updatedAt: Date
    campaignCohorts: campaignCohort[]
    notificationMeta: {
        id: string
        title: string
        body: string
        link: string | null
        createdAt: Date
        updatedAt: Date
    }

    constructor(data: CampaignAllData) {
        this.id = data.id
        this.name = data.name
        this.notificationMetaID = data.notificationMetaID
        this.status = data.status
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
        this.campaignCohorts = data.campaignCohorts
        this.notificationMeta = data.notificationMeta
    }
}