import { Availability } from '../constants/enums/availability'
import { TUniversity } from './university'

export type TSubjectGrade = {
   name: string
   id: string
   grade: {
      name: string
      id: string
      board: {
         name: string
         id: string
      }
   }
}

export type TSubject = {
   availability: Availability
   batchID: string
   color: string
   createdAt: string
   id: string
   isNew: boolean
   name: string
   image: string
   position: number
   gradeID: string
   grade: TSubjectGrade
   type: string
   courseInfoVideoUrl: string
   courseDurationSeconds: number
   comingSoon: boolean
   academicGroupID?: string
   academicGroup: {
      name: string
      id: string
      userGradeGroupID: string
   }
   universities: TUniversity[]
   universityIDs: string[]
}
