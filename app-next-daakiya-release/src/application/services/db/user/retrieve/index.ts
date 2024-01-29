import { API } from 'aws-amplify'
import { Queries } from './graphql'
import { UserDbModel } from '../models/user.db.model'

export class Retrieve {
   static async getUserData(id: string): Promise<UserDbModel | null> {
      const response: any = await API.graphql({
         query: Queries.GetAuthUserData,
         variables: {
            id,
         },
      })
      const data = response?.data?.getDoubtSolver

      return data
   }
}
