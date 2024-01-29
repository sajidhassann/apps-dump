import { Paper, PaperProps } from '@mantine/core';
import { ReactNode } from 'react';

export interface MaqsadCardProps extends PaperProps {
   children:ReactNode
}

export function MaqsadCard(props: MaqsadCardProps) {
   return <Paper {...props}>
      {props.children}
          </Paper>;
}
