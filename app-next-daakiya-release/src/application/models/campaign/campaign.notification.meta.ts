export default class CampaignNotificationMeta {
    id?: string
    title: string
    body: string
    link: string

    constructor(data: CampaignNotificationMeta) {
        this.id = data.id
        this.body = data.body
        this.title = data.title
        this.link = data.link ?? ''
    }
}
