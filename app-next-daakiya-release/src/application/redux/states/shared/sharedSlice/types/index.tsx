import Feature from '@src/application/constants/enums/feature.enum'
import { SectionViewType } from '@src/application/constants/enums/notes.view.type'

export interface IBreadcrumbs {
   title: string
   sectionType: SectionViewType
   position?: number
}

export interface SharedDefaultState {
   editFormType: SectionViewType
   activeForm: SectionViewType
   breadcrumbs: IBreadcrumbs[]
   isAcademicModalOpen: boolean
   currentFeature: Feature
}

export const defaultState: SharedDefaultState = {
   editFormType: SectionViewType.DEFAULT,
   activeForm: SectionViewType.DEFAULT,
   breadcrumbs: [
      { title: 'Board', sectionType: SectionViewType.BOARD, position: 1 },
   ],
   isAcademicModalOpen: false,
   currentFeature: Feature.NOTES,
}
