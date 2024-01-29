import { Badge, BadgeProps } from '@mantine/core';

export interface MaqsadBadgeProps extends BadgeProps {

}

export function MaqsadBadge(props:MaqsadBadgeProps) {
   return <Badge {...props} />;
}
