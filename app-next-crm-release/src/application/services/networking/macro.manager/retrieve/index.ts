import { CRM_API_URL } from '@/application/constants/urls'
import { User, UserData } from '@/application/models/shared/user.model'
import { Macro } from '@/application/models/macro/macro.model'
import axios from 'axios'

export class Retrieve {

    static async getMacros(): Promise<Macro[]> {
        const response = await axios.get<Macro[]>(`${CRM_API_URL}/macros`)
        return response.data.map((macro) => new Macro(macro))
    }


}