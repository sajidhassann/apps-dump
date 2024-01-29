import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { CRM_API_URL } from '@/application/constants/urls'
import {
    AdminCreateCohortRequest
} from '@/application/redux/networkThunk/admin/cohort/types/admin.create.cohort.request.dto'
import {
    AdminCreateCohortResponse
} from '@/application/redux/networkThunk/admin/cohort/types/admin.create.cohort.response.dto'
import {
    AdminUploadCohortRequest
} from '@/application/redux/networkThunk/admin/cohort/types/admin.upload.cohort.request.dto'

export const createCohort = createAsyncThunk(
    'create/admin/cohort/',
    async (data: AdminCreateCohortRequest): Promise<AdminCreateCohortResponse> => {
        const request: AxiosRequestConfig = {
            method: 'post',
            url: `${CRM_API_URL}/admin/create/cohort`,
            data: JSON.stringify(data),

            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await axios(request)
        return response.data
    }
)

export const uploadCohort = createAsyncThunk(
    'upload/admin/cohort/',
    async (data: AdminUploadCohortRequest): Promise<void> => {
        const formData = new FormData()
        formData.append('cohortID', data.cohortID)
        formData.append('file', data.file)
        const request: AxiosRequestConfig = {
            method: 'post',
            url: `${CRM_API_URL}/admin/upload/csv/cohort-calls`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const response = await axios(request)
        return response.data
    }
)