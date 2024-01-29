import { Availability } from '../constants/enums/availability'

export type TAcademicGroup = {
   id: string
   userGradeGroupID: string
   name: string
   availability: Availability
}
