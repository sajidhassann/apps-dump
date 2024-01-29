import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js';
import { Container } from '@mantine/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { font } from '@/src/theme/font';

ChartJS.register(ArcElement, ChartDataLabels, Tooltip);

export interface PieChartProps {
  values: number[];
}

export function PieChart(props: PieChartProps) {
  const data = {
    datasets: [
      {
        labels: ['Treatment', 'Control'],
        data: props.values,
        borderWidth: 0,
        backgroundColor: ['#F1F2F3', '#F2AE1C'],
        datalabels: {
          color: '#646466',
          formatter: (value: number) =>
            `${Math.round(
              (value * 100) / props.values.reduce((partialSum, a) => partialSum + a, 0)
            )}%`,
          font: {
            size: '22',
            family: font.style.fontFamily,
            weight: '600',
          },
        },
      },
    ],
  };
  return (
    <>
      <Container>
        <Pie
          width="180px"
          height="180px"
          // @ts-ignore
          data={data}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: false,
              },
              legend: {
                display: true,
              },
              tooltip: {
                displayColors: false,
                callbacks: {
                  label: (context: any) => {
                    return `Total: ${context.formattedValue}`;
                  },
                },
              },
            },
          }}
        />
      </Container>
    </>
  );
}
