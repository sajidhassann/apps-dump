import PackageInfo from '@src/../package.json'
import { Enums } from './enums'
import { Images } from './images'
import { Links } from './links'
import { Policies, UserRole } from './policies/access.control.policy'
// import { Menu } from './menu'
import { availabilityList } from './options-list'
import { serviceURL } from './service-url'
import Storage from './storage/s3.path'
import { SVGs } from './svgs'

export const APPLICATION_NAME = 'Daakiya'
export const APP_VERSION = `${APPLICATION_NAME} ${PackageInfo.version}`
export const COPYRIGHT = `Copyright © ${new Date().getFullYear()} Maqsad (Pvt.) Ltd. All Rights Reserved.`

export const DEFAULT_PAGE_SIZE = 25

export const GENERIC_ERROR_MESSAGE = 'Something went wrong'


export const Limits = {
   defaultPageSize: DEFAULT_PAGE_SIZE,
}

export const ECAT_GRADE_ID = process.env.NEXT_PUBLIC_ECAT_GRADE_ID
export const ENTRY_TESTS_BOARD_ID = process.env.NEXT_PUBLIC_ENTRY_TESTS_BOARD_ID
// export const CURRENT_COHORT_ID = '537d2b14-8f9b-477d-8695-7aa46f5cd030'

export { Enums } from './enums/index'
export { Images } from './images'
export { Links } from './links'
// export { Menu } from './menu'
export { availabilityList } from './options-list'
export { Policies, UserRole } from './policies/access.control.policy'
export { serviceURL } from './service-url'
export { SVGs } from './svgs'

const Constants = {
   appName: APPLICATION_NAME,
   appVersion: APP_VERSION,
   copyright: COPYRIGHT,
   enum: Enums,
   images: Images,
   links: Links,
   // menu: Menu,
   policies: Policies,
   serviceURL: serviceURL,
   svgs: SVGs,
   userRole: UserRole,
   storage: Storage,
   availabilityList: availabilityList,
}

export default Constants
