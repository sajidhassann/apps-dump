
export class NotificationStats {

    readonly totalUsers: number
    readonly totalDelivered: number
    readonly totalReceived: number
    readonly totalOpened: number
    readonly totalFailed: number
    readonly totalDeliveredPercentage: string
    readonly totalReceivedPercentage: string
    readonly totalOpenedPercentage: string
    readonly totalFailedPercentage: string

    constructor(data: NotificationStats) {
        this.totalUsers = data.totalUsers
        this.totalFailed = data.totalFailed
        this.totalDelivered = data.totalDelivered
        this.totalOpened = data.totalOpened
        this.totalReceived = data.totalReceived
        this.totalDeliveredPercentage = this.trimPercentage(data.totalDeliveredPercentage)
        this.totalReceivedPercentage = this.trimPercentage(data.totalReceivedPercentage)
        this.totalOpenedPercentage = this.trimPercentage(data.totalOpenedPercentage)
        this.totalFailedPercentage = this.trimPercentage(data.totalFailedPercentage)

    }

    private trimPercentage(p: string){
        return p.replace(/^0+(\d)|(\d)0+$/gm, '$1$2').replace(/.0$/,'')
    }
}
