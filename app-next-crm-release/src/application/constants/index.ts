import PackageInfo from 'package.json'
import { Enums } from './enums'
import { Images } from './images'
import { Links } from './links'
import { Menu } from './menu'
import { SVGs } from './svgs'

export const APPLICATION_NAME = 'Maqsad CRM'
export const APP_VERSION = `Maqsad CRM ${PackageInfo.version}`
export const COPYRIGHT = `Copyright © ${new Date().getFullYear()} Maqsad (Pvt.) Ltd. All Rights Reserved.`

export const DEFAULT_PAGE_SIZE = 25

export const Limits = {
	defaultPageSize: DEFAULT_PAGE_SIZE
}

export { Images } from './images'
export { SVGs } from './svgs'
export { Menu } from './menu'
export { Links } from './links'
export { Enums } from './enums'

export const Constants = {
	appName: APPLICATION_NAME,
	appVersion: APP_VERSION,
	copyright: COPYRIGHT,
	enums: Enums,
	images: Images,
	limits: Limits,
	links: Links,
	menu: Menu,
	svgs: SVGs,

}

export default Constants