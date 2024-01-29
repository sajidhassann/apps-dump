import { Availability } from '../constants/enums/availability'
import { CommonSubPropertyType } from './common.sub.property.type'

export type TTopicSubject = {
   name: string
   id: string
   grade: {
      name: string
      id: string
      board: CommonSubPropertyType
   }
}

export type TTopic = {
   id: string
   name: string
   subjectID: string
   difficulty: number
   createdAt: string
   availability: Availability
   image: string
   numberOfLessons: number
   position: number
   subject: TTopicSubject
}

export type TUpdateTopicAvailability = {
   id: string
   availability: Availability
}
