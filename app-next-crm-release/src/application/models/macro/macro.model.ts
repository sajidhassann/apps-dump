import { Availability } from '@/application/constants/enums/availability'

export class Macro {
    readonly id: string
    readonly title: string
    readonly response: string
    readonly tags: string[]
    readonly tag?: string
    readonly availability: Availability

    constructor(data: Macro) {
        this.id = data.id
        this.title = data.title
        this.response = data.response
        this.tags = data.tags ?? []
        this.availability = data.availability
        this.tag = `${this.title} ${this.title.split(' ').join('')} ${this.tags.join(' ')}`
    }
}