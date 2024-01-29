import '@mantine/core/styles.css';
import React, { ReactNode } from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../../theme';
import { LayoutProvider } from '../../providers/Layout';

export const metadata = {
  title: 'Ferozi',
  description: 'I am using Mantine with Next.js!',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
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
          <LayoutProvider>{children}</LayoutProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
