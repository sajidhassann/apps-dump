import { CRM_API_URL } from '@/application/constants/urls'
import axios from 'axios'
import { IAgent } from '@/application/services/networking/models/agent.interface'

export class Create {

	static async createAgent(data: IAgent) {
		return axios.post(`${CRM_API_URL}/agent/create`, data)
	}

	static async bulkUploadCohortCalls(cohortID: string, file: any): Promise<any> {
        
		// const response = await axios.post(`${CRM_API_URL}/admin/create/cohort-calls`, file, {  
    //         cohortID,
    //         headers: {
    //             'Content-Type': file.type
    //           }
    //     })

		// return response
	}

}