interface ILastPurchased {
    'productName'?: string,
    'paymentMethod'?: string,
    'purchaseDate'?: string
}
export class UserProperties {
    readonly fullName: string
    readonly os: string
    readonly osVersion: string
    readonly appVersion: string
    readonly city: string
    readonly region: string
    readonly userID: string
    readonly lastPurchased: ILastPurchased
    readonly remainingDoubts: string
    readonly firstAppSession: string
    readonly sikkayStatus?: string
    readonly class?: string
    readonly board?: string

    constructor(data: UserProperties) {
        this.fullName = data.fullName || 'N/A'
        this.os = data.os || 'N/A'
        this.osVersion = data.osVersion || ''
        this.appVersion = data.appVersion || 'N/A'
        this.city = data.city || 'N/A'
        this.region = data.region || ''
        this.userID = data.userID
        this.lastPurchased = data.lastPurchased
        this.lastPurchased.productName = data.lastPurchased.productName || 'N/A'
        this.lastPurchased.paymentMethod = data.lastPurchased.paymentMethod || 'N/A'
        this.lastPurchased.purchaseDate = data.lastPurchased.purchaseDate || 'N/A'
        this.remainingDoubts = data.remainingDoubts || 'N/A'
        this.firstAppSession = data.firstAppSession || 'N/A'
        this.sikkayStatus = data.sikkayStatus || 'N/A'
        this.class = data.class || 'N/A'
        this.board = data.board || 'N/A'
    }
}