import { JSX } from 'react';

export type MenuItem = {
   title: string
   url: string
   icon?: ((props:any) => JSX.Element)
};

export type FooterMenu = {
   title: string
   links: MenuItem[]
};
