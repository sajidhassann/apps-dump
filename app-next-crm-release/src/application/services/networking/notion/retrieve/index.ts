import { CRM_API_URL } from '@/application/constants/urls'
import axios from 'axios'
import { NotionUserNetworkModel } from '../../models/notion.user.network.model'

export class Retrieve {

	// static cache: { [key: string]: any } = {}

	static async listNotionUsers(): Promise<NotionUserNetworkModel[]> {
		const response = await axios.get<NotionUserNetworkModel[]>(`${CRM_API_URL}/notion/users`)
		const data = response.data.map((item) => new NotionUserNetworkModel(item))
		return data
	}

}