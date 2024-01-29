import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { serviceURL } from '@application/constants'
import { CreateAssestRequestDto } from './dto/create.asset.request.dto'
import { CreateAssestResponseDto } from './dto/create.asset.response.dto'
import { NotificationType, Notify } from '@/src/components/core/Notification'
import { Ferozi } from '@/src/application/redux/features/ferozis/models/ferozi'
import { ManageFeroziRequestDto } from './dto/manage.ferozi.request.dto'
import { ListFeroziResponseDto } from './dto/list.ferozi.response.dto'
import { FeroziStat } from '@/src/application/redux/features/ferozis/models/ferozi.stat.model'
import { FeroziStatResponseDto } from '@/src/application/redux/features/ferozis/dto/ferozi.analytics.response.dto'

export interface IFerozisState {
   loading: boolean;
   ferozis?: Ferozi[];
   currentFerozi?: Ferozi;
   feroziAnalytics?: FeroziStat
}

export const defaultState: IFerozisState = {
   loading: false,
}

export const listFerozis = createAsyncThunk(
   'list/ferozis',
   async () => {
      const config: AxiosRequestConfig = {
         method: 'get',
         url: `${serviceURL.haazireURL}/ferozi/list`,
      }

      const response = await axios.request<ListFeroziResponseDto[]>(config)
      return response.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
   },
)

export const manageFerozi = createAsyncThunk(
   'manage/ferozi',
   async (req: Partial<ManageFeroziRequestDto>) => {
      const config: AxiosRequestConfig = {
         method: req.id ? 'patch' : 'post',
         maxBodyLength: Infinity,
         url: `${serviceURL.haazireURL}/ferozi/${req.id ? 'update' : 'create'}`,
         headers: {
            'Content-Type': 'application/json',
         },
         data: req,
      }
      await axios.request(config)
   },
)

export const deleteFerozi = createAsyncThunk(
   'delete/ferozi',
   async (feroziID: string) => {
      const config: AxiosRequestConfig = {
         method: 'delete',
         url: `${serviceURL.haazireURL}/ferozi/delete`,
         headers: {
            'Content-Type': 'application/json',
         },
         data: { feroziID },
      }
      await axios.request(config)
   },
)

export const getFeroziStats = createAsyncThunk(
   'ferozi/stats',
   async (feroziID: string) => {
      const config: AxiosRequestConfig = {
         method: 'get',
         url: `${serviceURL.haazireURL}/ferozi/stats/${feroziID}`,

      }

      const response = await axios.request<FeroziStatResponseDto>(config)
      return response.data
   },
)

export const createAsset = createAsyncThunk(
   'upload/ferozi/illustration',
   async (req: CreateAssestRequestDto): Promise<CreateAssestResponseDto> => {
      const config: AxiosRequestConfig = {
         method: 'post',
         maxBodyLength: Infinity,
         url: `${serviceURL.haazireURL}/storage/asset/upload`,
         headers: {
            'Content-Type': 'multipart/form-data',
         },
         data: req,
      }
      const response = await axios.request(config)
      return response.data
   },
)

export const ferozisSlice = createSlice({
   name: 'ferozis',
   initialState: defaultState,
   reducers: {
      setCurrentFerozi(state, action: PayloadAction<Ferozi | undefined>) {
         state.currentFerozi = action.payload
      },
      changeFeroziStatus(state, action: PayloadAction<Ferozi>) {
         const ferozi = state.ferozis?.find((ferozi) => ferozi.id === action.payload.id);
         if (ferozi) {
             ferozi.isActive = action.payload.isActive;
         }
      },

   },
   extraReducers: (builder) => {
      builder.addCase(createAsset.rejected, (state) => {
         Notify({
            title: 'Sucess',
            message: 'Successfully created ferozi',
            type: NotificationType.ERROR,
         })
      })
      builder.addCase(manageFerozi.rejected, (state) => {
         Notify({
            title: 'Error',
            message: 'Unable to create ferozi',
            type: NotificationType.ERROR,
         })
      })
      builder.addCase(listFerozis.pending, (state) => {
         state.loading = true
      })
      builder.addCase(listFerozis.rejected, (state) => {
         state.loading = false
         Notify({
            title: 'Error',
            message: 'Unable to list ferozis',
            type: NotificationType.ERROR,
         })
      })
      builder.addCase(listFerozis.fulfilled, (state, action) => {
         state.loading = false
         state.ferozis = action.payload
      })
      builder.addCase(getFeroziStats.pending, (state) => {
         state.loading = true
      })
      builder.addCase(getFeroziStats.rejected, (state) => {
         state.loading = false
         Notify({
            title: 'Error',
            message: 'Unable to get ferozi analytics',
            type: NotificationType.ERROR,
         })
      })
   },
})

export const {
   setCurrentFerozi,
   changeFeroziStatus,
} = ferozisSlice.actions

export default ferozisSlice.reducer
