import { Availability } from '../constants/enums/availability'
import { TBoardType } from './boardType'
import { TProvince } from './province'

export type TBoard = {
   availability: Availability
   createdAt: string
   id: string
   name: string
   position: number
   updatedAt: string
   province: TProvince
   boardType: TBoardType
}

export type TUpdateBoardAvailability = {
   availability: Availability
   id: string
}
