import PackageInfo from '../../package.json';
import { Images } from './images';
import { Links } from './links';
import { Policies, UserRole } from './policies/access.control.policy';
import { serviceURL } from './service-url';

export const APPLICATION_NAME = 'Ferozi';
export const APP_VERSION = `${APPLICATION_NAME} ${PackageInfo.version}`;
export const COPYRIGHT = `Copyright © ${new Date().getFullYear()} Maqsad (Pvt.) Ltd. All Rights Reserved.`;

export const DEFAULT_PAGE_SIZE = 25;

export const Limits = {
   defaultPageSize: DEFAULT_PAGE_SIZE,
};

export { Links } from './links';
export { Policies, UserRole } from './policies/access.control.policy';
export { serviceURL } from './service-url';

export { Images } from './images';

const Constants = {
   appName: APPLICATION_NAME,
   appVersion: APP_VERSION,
   copyright: COPYRIGHT,
   links: Links,
   images: Images,
   policies: Policies,
   serviceURL,
   userRole: UserRole,
};

export default Constants;
