import { Grid, Loader, Stack } from '@mantine/core';
import { DashboardOverview } from '@components/ferozis/Analytics/Dashboard/Overview';
import { CompletionView } from '@components/ferozis/Analytics/Dashboard/CompletionView';
import { SplitView } from '@components/ferozis/Analytics/Dashboard/SplitView';
import { ProgressView } from '@components/ferozis/Analytics/Dashboard/ProgressView';
import { useEffect, useState } from 'react';
import { FeroziAnalytics } from '@/src/application/redux/features/ferozis/models/ferozi.analytics.model';
import { getFeroziStats, IFerozisState } from '@/src/application/redux/features/ferozis';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';

export interface DashboardProps {
  feroziID?: string;
}
export function Dashboard(props: DashboardProps) {
  const [selectedFeroziAnalytics, setSelectedFeroziAnalytics] = useState<null | FeroziAnalytics>(
    null
  );

  const dispatch = useAppDispatch();

  const { ferozis }: IFerozisState = useAppSelector<IFerozisState>((state) => state.ferozi);

  const getFeroziAnalytics = async (feroziID: string) => {
    if (!ferozis) return;
    const ferozi = ferozis.find((f) => f.id === feroziID);
    if (!ferozi) return;
    const feroziStat = await dispatch(getFeroziStats(feroziID)).unwrap();
    const feroziAnalytics = new FeroziAnalytics(ferozi, feroziStat);
    setSelectedFeroziAnalytics(feroziAnalytics);
  };

  useEffect(() => {
    if (props.feroziID == null) {
      return;
    }
    setSelectedFeroziAnalytics(null);
    getFeroziAnalytics(props.feroziID);
  }, [props.feroziID, ferozis]);

  if (selectedFeroziAnalytics == null) {
    return <Loader />;
  }

  return (
    <Grid grow w="100%" p="20">
      <Grid.Col span={12}>
        <DashboardOverview {...selectedFeroziAnalytics} />
      </Grid.Col>
      <Grid.Col span={2}>
        <CompletionView
          title="Control"
          activeKey="Acknowledged Control"
          inActiveKey="Total Control"
          value={selectedFeroziAnalytics.acknowledgedControlCount ?? 0}
          total={selectedFeroziAnalytics.controlCount ?? 0}
        />
      </Grid.Col>
      <Grid.Col span={2}>
        <CompletionView
          title="Treatment"
          activeKey="Acknowledged Treatment"
          inActiveKey="Total Treatment"
          value={selectedFeroziAnalytics.acknowledgedTreatmentCount ?? 0}
          total={selectedFeroziAnalytics.treatmentCount ?? 0}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <SplitView
          title="Actual split"
          activeKey="Treatment"
          inActiveKey="Control"
          values={[
            selectedFeroziAnalytics?.controlCount ?? 0,
            selectedFeroziAnalytics?.treatmentCount ?? 0,
          ]}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <Stack>
          <ProgressView
            title="Ticket Pool"
            subHeading="In progress"
            total={selectedFeroziAnalytics?.maxCapacity ?? 0}
            value={selectedFeroziAnalytics?.totalExperimentedCount ?? 0}
            description={`${selectedFeroziAnalytics?.remainingCapacity ?? 0} remaining`}
          />
          <ProgressView
            title="T+C/users in lens"
            subHeading="Users who have assigned T or C"
            total={selectedFeroziAnalytics?.sampleCount ?? 0}
            value={selectedFeroziAnalytics?.totalExperimentedCount ?? 0}
          />
        </Stack>
      </Grid.Col>
      <Grid.Col span={4} />
    </Grid>
  );
}
