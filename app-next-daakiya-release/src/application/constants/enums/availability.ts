export enum Availability {
	RELEASED = 'RELEASED',
	COMING_SOON = 'COMING_SOON',
	INTERNAL = 'INTERNAL',
	DISCONTINUED = 'DISCONTINUED',
	DELETED = 'DELETED',
	UNKNOWN = 'UNKNOWN',
}

export const availabilityToString = {
	[Availability.RELEASED]: 'Released',
	[Availability.COMING_SOON]: 'Coming Soon',
	[Availability.INTERNAL]: 'Internal',
	[Availability.DISCONTINUED]: 'Discontinued',
	[Availability.DELETED]: 'Deleted',
	[Availability.UNKNOWN]: 'Unknown',
}
