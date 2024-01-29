type Data = {
    received: number
    sent: number
    opened: number
    failed: number
}

export class NotificationStats {

    readonly totalUsers: number
    readonly totalDelivered: number // r+o+s
    readonly totalReceived: number
    readonly totalOpened: number
    readonly totalFailed: number
    readonly totalDeliveredPercentage: string
    readonly totalReceivedPercentage: string
    readonly totalOpenedPercentage: string
    readonly totalFailedPercentage: string

    constructor(data: Data) {
        this.totalUsers = Object.values(data).reduce((acc, count) => acc + count, 0) ?? 0
        this.totalFailed = data.failed ?? 0
        this.totalDelivered = this.totalUsers - this.totalFailed
        this.totalOpened = data.opened ?? 0
        this.totalReceived = data.received ?? 0
        this.totalDeliveredPercentage = this.getPercentage(this.totalDelivered)
        this.totalReceivedPercentage = this.getPercentage(this.totalReceived)
        this.totalOpenedPercentage = this.getPercentage(this.totalOpened)
        this.totalFailedPercentage = this.getPercentage(this.totalFailed)

    }

    private getPercentage(current: number) {
        return (this.totalUsers > 0 ? (current / this.totalUsers) * 100 : 0).toFixed(2);
    }


}
