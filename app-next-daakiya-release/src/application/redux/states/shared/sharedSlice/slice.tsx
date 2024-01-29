import { createSlice, PayloadAction } from '@reduxjs/toolkit' //next js redux toolkit
import Feature from '@src/application/constants/enums/feature.enum'
import { SectionViewType } from '@src/application/constants/enums/notes.view.type'
import { defaultState, IBreadcrumbs } from './types'

export const sharedSlice = createSlice({
   name: 'shared',
   initialState: defaultState,
   reducers: {
      setAcademicModalOpen: (state, action: PayloadAction<boolean>) => {
         state.isAcademicModalOpen = action.payload
      },
      setEditFormType: (state, action: PayloadAction<SectionViewType>) => {
         state.editFormType = action.payload
      },

      resetEditFormType: (state) => {
         state.editFormType = SectionViewType.DEFAULT
      },

      setActiveForm: (state, action: PayloadAction<SectionViewType>) => {
         state.activeForm = action.payload
      },

      resetActiveForm: (state) => {
         state.activeForm = SectionViewType.DEFAULT
      },

      updateBreadcrumbs: (state, action: PayloadAction<IBreadcrumbs>) => {
         const index = state.breadcrumbs.findIndex(
            (breadcrumb) =>
               breadcrumb.sectionType === action.payload.sectionType
         )
         if (index !== -1) state.breadcrumbs.length = index

         const { title, sectionType: activeForm, position } = action.payload
         const _position = position ?? state.breadcrumbs.length + 1

         state.breadcrumbs = [
            ...state.breadcrumbs,
            { title, sectionType: activeForm, position: _position },
         ]
      },

      setCurrentFeature: (state, action: PayloadAction<Feature>) => {
         state.currentFeature = action.payload as Feature
      },
   },
})

export const {
   setEditFormType,
   resetEditFormType,
   setActiveForm,
   resetActiveForm,
   updateBreadcrumbs,
   setAcademicModalOpen,
   setCurrentFeature,
} = sharedSlice.actions

export default sharedSlice.reducer
