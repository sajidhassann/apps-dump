import '@mantine/core/styles.css';
import React, { ReactNode } from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '@/src/theme';

import { AuthProvider } from '../providers/Auth';
import { fontClass } from '../theme/font';

import ReduxProvider from '../providers/Provider';

export const metadata = {
  title: 'Ferozi',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={fontClass}>
        <MantineProvider theme={theme}>
          <ReduxProvider>
            <AuthProvider>{children}</AuthProvider>
          </ReduxProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
