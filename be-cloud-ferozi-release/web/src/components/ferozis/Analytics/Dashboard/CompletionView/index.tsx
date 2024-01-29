import { Group, Indicator, RingProgress, Stack, Text, Title, Tooltip } from '@mantine/core';
import { MaqsadCard } from '@components/core/MaqsadCard';

export interface CompletionViewProps {
  title: string;
  activeKey: string;
  inActiveKey: string;
  value: number;
  total: number;
}

export function CompletionView(props: CompletionViewProps) {
  const chartKey = (title: string, color: string) => (
    <Group gap={8}>
      <Indicator color={color} size="8px" />
      <Text c="body" size="sm">
        {title}
      </Text>
    </Group>
  );


  const getValuePercentage = () => {
    if (props.total == 0) return 0;
    return parseFloat(((props.value / props.total) * 100).toFixed(0));
  }

  const getTooltipLabel = () => {
    return `Total: ${props.total} \nAcknowledged: ${props.value}`;
  }


  return (

    <MaqsadCard px="md" py="md" shadow="sm">
      <Stack align="center" gap={4}>
        <Stack align="left" gap={4}>
          <Title order={3} c="sub-heading" size="lg">
            {props.title}
          </Title>
          <Stack gap={2}>
            {chartKey(props.activeKey, 'primary')}
            {chartKey(props.inActiveKey, 'body')}
          </Stack>
        </Stack>
        <Tooltip.Floating
          multiline
          label={getTooltipLabel()}
        >
          <RingProgress
            size={160}
            thickness={12}
            roundCaps
            label={
              <Title order={1} ta="center" c="sub-heading">
                {getValuePercentage()}%
              </Title>
            }
            sections={[
              { value: 100 - getValuePercentage(), color: '#F1F2F3' },
              { value: getValuePercentage(), color: 'primary' },
            ]}
          />
        </Tooltip.Floating>

      </Stack>
    </MaqsadCard>
  );
}
