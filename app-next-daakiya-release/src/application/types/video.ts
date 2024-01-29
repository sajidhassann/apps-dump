import { Availability } from '../constants/enums/availability'

export type TVideo = {
   id: string
   videoURL: string
   availability: Availability
   thumbnail: string
   supportedVideoQualitiesIDs: string[]
   createdAt: string
   updatedAt: string
}
