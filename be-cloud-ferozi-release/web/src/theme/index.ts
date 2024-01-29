'use client';

import { createTheme, rem } from '@mantine/core';
import { font } from './font';

export const theme = createTheme({
   fontFamily: font.style.fontFamily,
   /* Put your mantine theme override here */
   colors: {
      primary: [
         '#fff8e2',
         '#fdefce',
         '#fadda0',
         '#f7cb6d',
         '#f4bb42',
         '#f2b127',
         '#f2ac16',
         '#d79607',
         '#c08500',
         '#a67200',
      ],
      secondary: [
         '#ebf5ff',
         '#dae6f6',
         '#b7cae5',
         '#91acd3',
         '#7193c4',
         '#5c83bb',
         '#507bb8',
         '#406aa2',
         '#355e93',
         '#265183'],
      warning: [
         '#f27781',
         '#f27781',
         '#f27781',
         '#f27781',
         '#f27781',
         '#f27781',
         '#f27781',
         '#f27781',
         '#f27781',
         '#f27781',
      ],
      safety: [
         '#ecfaec',
         '#ddf0df',
         '#bdddc0',
         '#99ca9e',
         '#7bba82',
         '#68b06f',
         '#5dab65',
         '#4d9554',
         '#418649',
         '#32733c',
      ],
      surface: [
         '#f5f5f5',
         '#e7e7e7',
         '#cdcdcd',
         '#b2b2b2',
         '#9a9a9a',
         '#8b8b8b',
         '#848484',
         '#717171',
         '#656565',
         '#575757',
      ],
      'sub-heading': [
         '#646466',
         '#646466',
         '#646466',
         '#646466',
         '#646466',
         '#646466',
         '#646466',
         '#646466',
         '#646466',
         '#646466',
      ],
      body: [
         '#B6B6B6',
         '#B6B6B6',
         '#B6B6B6',
         '#B6B6B6',
         '#B6B6B6',
         '#B6B6B6',
         '#B6B6B6',
         '#B6B6B6',
         '#B6B6B6',
         '#B6B6B6',
      ],
      heading: [
         '#f5f5f5',
         '#e7e7e7',
         '#cdcdcd',
         '#b2b2b2',
         '#9a9a9a',
         '#8b8b8b',
         '#848484',
         '#717171',
         '#656565',
         '#575757',
      ],
   },
   shadows: {
      sm: '0px 4px 44px 0px rgba(0, 0, 0, 0.05)',
      md: '0px 8px 40px 0px rgba(0, 0, 0, 0.15)',
      lg: '0px 12px 40px 0px rgba(0, 0, 0, 0.20)',
   },
   primaryColor: 'primary',
   radius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
   },
   fontSizes: {
      xs: rem(10),
      sm: rem(12),
      md: rem(14),
      lg: rem(16),
      xl: rem(18),
      xxl: rem(26),
      xxxl: rem(36),
   },
   headings: {
      sizes: {
         h1: {
            fontWeight: '500',
            fontSize: rem(36),
         },
         h2: {
            fontWeight: '500',
            fontSize: rem(26),
         },
         h3: {
            fontWeight: '500',
            fontSize: rem(18),
         },

         h4: {
            fontWeight: '500',
            fontSize: rem(16),
         },
         h5: {
            fontWeight: '600',
            fontSize: rem(14),
         },
         h6: {
            fontWeight: '500',
            fontSize: rem(12),
         },

         },

      },
   defaultRadius: 'sm',
});
