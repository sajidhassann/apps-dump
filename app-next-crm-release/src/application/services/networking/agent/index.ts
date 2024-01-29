import { Create } from './create'
import { Retrieve } from './retrieve'
import { Update } from './update'

export class AgentNetworkManager {
	static readonly retrieve = Retrieve
	static readonly update = Update
	static readonly create = Create
}