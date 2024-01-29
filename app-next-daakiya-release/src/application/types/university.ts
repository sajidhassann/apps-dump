import { Availability } from '../constants/enums/availability'

export type TUniversity = {
   id: string
   name: string
   availability: Availability
   createdAt: string
   image: string
   nickName: string
}
