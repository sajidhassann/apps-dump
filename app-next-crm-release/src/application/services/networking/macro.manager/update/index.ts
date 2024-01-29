import { CRM_API_URL } from '@/application/constants/urls'
import axios from 'axios'
import { Macro } from '@/application/models/macro/macro.model'

export class Update {
	static async updateMacro(data: Macro) {
		const response = await axios.patch<Macro>(`${CRM_API_URL}/macros`, data)
		return new Macro(response.data)
	}

}