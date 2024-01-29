import { CRM_API_URL } from '@/application/constants/urls'
import axios from 'axios'
import { Macro } from '@/application/models/macro/macro.model'

export class Delete {
	static async deleteMacro(id: string) {
		const response = await axios.delete<Macro>(`${CRM_API_URL}/macros/${id}`,)
		return new Macro(response.data)
	}

}