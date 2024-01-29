import { MdDashboard } from 'react-icons/md';
import { FaCapsules } from 'react-icons/fa6';
import { MenuItem } from '../types';

export const MAIN_MENU: MenuItem[] = [
   {
      title: 'Dashboard',
      url: '/admin/ferozis/analytics',
      icon: MdDashboard,
   },
   {
      title: 'Ferozis',
      url: '/admin/ferozis',
      icon: FaCapsules,
   },
];
