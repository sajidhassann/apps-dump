import { Availability } from '../constants/enums/availability'
import { TBoard } from './board'
import { CommonSubPropertyType } from './common.sub.property.type'

export type TGrade = {
   availability: Availability
   boardID: string
   createdAt: string
   id: string
   name: string
   userGradeGroupID: string
   updatedAt: string
   board: CommonSubPropertyType
}

export type IUpdateGradeAvailability = {
   availability: Availability
   id: string
}
