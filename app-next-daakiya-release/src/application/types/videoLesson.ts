import { Availability } from '../constants/enums/availability'
import { CommonSubPropertyType } from './common.sub.property.type'

export type TVideoLesson = {
   id: string
   name: string
   position: number
   availability: Availability
   topicID: string
   subjectID: string
   videoOnDemandSubject: {
      id: string
      name: string
      gradeID: string
   }
   createdAt: string
   videoID: string
   materialType: CommonSubPropertyType
   isPaid: boolean
}

export type TUpdateVideLessonStatus = {
   id: string
   availability: Availability
   isPaid: boolean
}
