import { MaqsadCard } from '@components/core/MaqsadCard';
import { Flex, Grid, Indicator, Stack, Text, Title } from '@mantine/core';
import { format, parseISO } from 'date-fns';
import { FeroziCapacityState } from '@/src/application/redux/features/ferozis/models/ferozi.capacity.state.model';
import { FeroziNature } from '@/src/application/redux/features/ferozis/models/ferozi.nature.model';

export interface DashboardOverviewProps {
    maxCapacity: number;
    nature: FeroziNature;
    givenTreatmentPercentage: number;
    givenControlPercentage: number;
    expectedTreatmentCount: number;
    isActive: boolean;
    type: string;
    capacityState: FeroziCapacityState;
    createdAt: string
}

export function DashboardOverview(props: DashboardOverviewProps) {
    const experimentNature = () => (
        <Stack gap={4}>
            <Text c="body" size="sm">
                Nature
            </Text>
            <Title order={3} c="sub-heading">
                {props.nature === FeroziNature.OPTIMISTIC ? 'Optimistic' : 'Pessimistic'}
            </Title>
        </Stack>
    );

    const maxCapacity = () => (
        <Stack gap={4}>
            <Text c="body" size="sm">
                Max Capacity
            </Text>
            <Title order={3} c="sub-heading">
                {props.maxCapacity}
            </Title>
        </Stack>
    );

    const split = () => (
        <Stack gap={4}>
            <Text c="body" size="sm">
                Given split
            </Text>
            <Stack gap={0}>
                <Title order={3} c="sub-heading">
                    {props.givenTreatmentPercentage}% /{props.givenControlPercentage}%
                </Title>
                <Text c="body" size="xs">
                    TREATMENT CONTROL
                </Text>
            </Stack>
        </Stack>
    );

    const expectedTreatment = () => (
        <Stack gap={4}>
            <Text c="body" size="sm">
                Expected Treatment
            </Text>
            <Title order={3} c="sub-heading">
                {props.expectedTreatmentCount}
            </Title>
        </Stack>
    );

    const status = () => (
        <Stack gap={4}>
            <Text c="body" size="sm">
                Status
            </Text>

            <Flex>
                <Indicator
                  processing={props.isActive}
                  size={6}
                  offset={1}
                  position="top-end"
                  c={props.isActive ? 'primrary' : 'surface'}
                >
                    <Title order={3} c="sub-heading">
                        {props.isActive ? 'Active' : 'In Active'}
                    </Title>
                    {/*Eee*/}
                </Indicator>
            </Flex>
        </Stack>
    );

    const type = () => (
        <Stack gap={4}>
            <Text c="body" size="sm">
                Type
            </Text>
            <Title order={3} c="sub-heading">
                {props.type}
            </Title>
        </Stack>
    );

    const capacityState = () => (
        <Stack gap={4}>
            <Text c="body" size="sm">
                Capacity State
            </Text>
            <Title
              order={3}
              c={props.capacityState === FeroziCapacityState.MAXED_OUT ? 'warning' : 'primary'}
            >
                {props.capacityState === FeroziCapacityState.MAXED_OUT && 'Maxed Out'}
                {props.capacityState !== FeroziCapacityState.MAXED_OUT && 'Remaining'}
            </Title>
        </Stack>
    );

    const createdAt = () => (
        <Stack gap={4}>
            <Text c="body" size="sm">
                Created At
            </Text>
            <Title order={3} c="sub-heading">
                {format(parseISO(props.createdAt), 'do MMM, yyyy')}
            </Title>
        </Stack>
    );

    return (
        <MaqsadCard px="xl" py="xl" shadow="sm">
            <Grid>
                {[
                    experimentNature(),
                    maxCapacity(),
                    split(),
                    expectedTreatment(),
                    status(),
                    type(),
                    capacityState(),
                    createdAt(),
                ].map((item) => (
                    <Grid.Col span={{
                        base: 12,
                        lg: 3,
                    }}
                    >{item}
                    </Grid.Col>
                ))}
            </Grid>
        </MaqsadCard>
    );
}
