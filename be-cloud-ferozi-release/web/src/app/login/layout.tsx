import '@mantine/core/styles.css';
import React, { ReactNode } from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../../theme';
import ReduxProvider from '../../providers/Provider';

export const metadata = {
  title: 'Ferozi',
  description: 'I am using Mantine with Next.js!',
};

export default function LoginLayout({ children }: { children: ReactNode }) {
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
      <body>
        <MantineProvider theme={theme}>
          <ReduxProvider>{children}</ReduxProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
