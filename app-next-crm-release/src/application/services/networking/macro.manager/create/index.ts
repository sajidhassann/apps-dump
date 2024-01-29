import { CRM_API_URL } from '@/application/constants/urls'
import axios from 'axios'
import { IAgent } from '@/application/services/networking/models/agent.interface'
import { Macro } from '@/application/models/macro/macro.model'

export class Create {
	static async createMacro(data: Macro) {
		const response = await axios.post<Macro>(`${CRM_API_URL}/macros`, data)
		return new Macro(response.data)
	}

}