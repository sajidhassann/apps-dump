// import { INotionUser } from '../../../interfaces/notion.user.interface'

export class NotionUserNetworkModel {
	readonly id: string
	readonly name: string
	readonly avatar_url: string
	readonly type: string
	readonly person: {
		readonly email: string;
	}

	constructor(data: any) {
		this.id = data.id
		this.name = data.name
		this.avatar_url = data.avatar_url
		this.type = data.type
		this.person = data.person
	}

	get email(): string {
		return this.person.email
	}
}