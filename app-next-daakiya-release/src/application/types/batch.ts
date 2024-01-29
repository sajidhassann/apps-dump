import { Availability } from '../constants/enums/availability'

export type TBatch = {
   id: string
   gradeID: string
   name: string
   createdAt: string
   availability: Availability
   position: number
   updatedAt: string
}

export type IUpdateBatchAvailability = {
   availability: Availability
   id: string
}
