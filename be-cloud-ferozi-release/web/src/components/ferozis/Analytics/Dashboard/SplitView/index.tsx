import { Group, Indicator, Stack, Text, Title } from '@mantine/core';
import { MaqsadCard } from '@components/core/MaqsadCard';
import { PieChart } from '@components/ferozis/Analytics/Dashboard/SplitView/PieChart';

export interface SplitViewProps {
  title: string;
  activeKey: string;
  inActiveKey: string;
  values: number[];
}

export function SplitView(props: SplitViewProps) {
  console.log('va', props.values);
  const chartKey = (title: string, color: string) => (
    <Group gap={8}>
      <Indicator color={color} size="10px" />
      <Text c="body" size="md">
        {title}
      </Text>
    </Group>
  );
  return (
    <MaqsadCard px="xl" py="md" shadow="sm">
      <Stack gap={4}>
        <Title order={3} c="sub-heading" size="lg">
          {props.title}
        </Title>
        <Group gap={12}>
          {chartKey(props.activeKey, 'primary')}
          {chartKey(props.inActiveKey, 'body')}
        </Group>
        <PieChart values={props.values} />
      </Stack>
    </MaqsadCard>
  );
}
