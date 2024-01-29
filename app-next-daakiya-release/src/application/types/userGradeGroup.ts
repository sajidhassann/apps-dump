import { Availability } from '@constants/enums/availability'

export type TUserGradeGroup = {
	readonly availability: Availability
	readonly createdAt: string
	readonly id: string
	readonly isActive: boolean
	readonly isDeleted: boolean
	readonly name: string
	readonly position: number
	readonly updatedAt: string
}
