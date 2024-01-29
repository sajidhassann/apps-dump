import { Poppins } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
export const font = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const fontClass = font.className;
