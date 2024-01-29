import { Create } from './create'
import { Delete } from './delete'
import { Retrieve } from './retrieve'
import { Update } from './update'

export class MacrosNetworkManager {
	static readonly retrieve = Retrieve
	static readonly update = Update
	static readonly create = Create
	static readonly delete = Delete
}