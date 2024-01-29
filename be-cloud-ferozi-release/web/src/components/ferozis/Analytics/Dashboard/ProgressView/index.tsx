import { Group, Progress, Stack, Text, Title } from '@mantine/core';
import { MaqsadCard } from '@components/core/MaqsadCard';

export interface ProgressViewProps {
  title: string;
  subHeading: string;
  total: number;
  value: number;
  description?: string;
}
export function ProgressView(props: ProgressViewProps) {
  const formatNumber = (number: number): string => {
    if (number > 1000) {
      return `${(number / 1000).toFixed(1)}k`;
    }
    return number.toString();
  };
  return (
    <MaqsadCard px="md" py="sm" shadow="sm">
      <Stack gap={16}>
        <Title order={3} c="sub-heading" size="lg">
          {props.title}
        </Title>
        <Stack gap={4}>
          <Text size="sm" c="body">
            {props.subHeading}
          </Text>
          <Progress value={(props.value / props.total) * 100} />
          {props.description && (
            <Group justify="space-between">
              <Text>{props.description}</Text>
              <Text c="body" ta="right">
                {props.value}/{props.total}
              </Text>
            </Group>
          )}

          {props.description == null && (
            <Text c="body" ta="right" w="100%">
              {formatNumber(props.value)}/{formatNumber(props.total)}
            </Text>
          )}
        </Stack>
      </Stack>
    </MaqsadCard>
  );
}
