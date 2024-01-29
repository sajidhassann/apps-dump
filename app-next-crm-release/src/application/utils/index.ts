import { format, isValid, parseISO } from 'date-fns'
//import { ClassElementUrlIndex } from '../constants/class.element.url.index/index'


export default class Utilities {
	public static formatDate = (date: string): string =>
		isValid(parseISO(date))
			? format(parseISO(date), 'dd-MMM-yy hh:mm a')
			: 'Invalid Date'

	public static toTitleCase = (str: string) => {
		return str.replace(
			/\w\S*/g,
			(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		)
	}

	public static mapEnumToSelectFields = <T extends Record<string, any>>(enumObject: T): { value: T[keyof T], label: string }[] => {
    return Object.keys(enumObject)
      .filter(key => isNaN(Number(key)))
      .map(key => ({ value: enumObject[key], label: key.split('_').join(' ')}));
  }
}


