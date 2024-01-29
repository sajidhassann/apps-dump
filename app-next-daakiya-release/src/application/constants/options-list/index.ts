import { Availability, availabilityToString } from '../enums/availability'

export const availabilityList = (
	Object.keys( Availability ) as Array<keyof typeof Availability>
).map( ( key ) => {
	return {
		label: availabilityToString[key],
		value: key,
	}
} )
