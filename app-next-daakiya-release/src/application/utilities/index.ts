import { format } from 'date-fns'
import { Availability } from '../constants/enums/availability'

export default class Utilities {
	static formatDate = (date: string): string =>
		format(new Date(parseInt(date)), 'dd-MMM-yy hh:mm a')

	static toTitleCase = (str: string) => {
		return str.replace(
			/\w\S*/g,
			(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		)
	}

	static isAvailabilityReleased = (value: string) =>
		value === Availability.RELEASED

	static filterByAvailability<
		T extends { availability: Availability; },
	>(array: T[]): T[] {
		const newArray = [...array]

		newArray.filter((item) => {
			return (item.availability === Availability.RELEASED ||
				item.availability === Availability.COMING_SOON ||
				item.availability === Availability.INTERNAL)
		})

		console.log('!!INFO: filterByAvailability: newArray: ', { newArray })

		return newArray
	}

	static sortByAvailability<
		T extends { availability: string; position: number },
	>(array: T[]): T[] {
		const newArray = [...array]

		newArray.sort((a, b) => {
			const availability1 = Utilities.isAvailabilityReleased(
				a['availability']
			)
				? 1
				: 0
			const availability2 = Utilities.isAvailabilityReleased(
				b['availability']
			)
				? 1
				: 0
			return availability1 > availability2
				? -1
				: availability1 < availability2
					? 1
					: 0
		})

		return newArray
	}

	static sortByPosition<T extends { position: number }>(array: T[]): T[] {
		const newArray = [...array]

		newArray.sort((a, b) => {
			return a['position'] < b['position']
				? -1
				: a['position'] > b['position']
					? 1
					: 0
		})

		return newArray
	}

	static reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
		const result = Array.from(list)

		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)

		return result
	}
}
