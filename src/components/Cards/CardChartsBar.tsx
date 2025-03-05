import ChartJs from '@configs/charts';
import themeConfigs from '@configs/themeConfigs';
import React from 'react';
import { Card } from 'react-bootstrap';

type Props = {};

function CardChartsBar({}: Props) {
  React.useEffect(() => {
    const canvasEl = document.getElementById(
      'chartjs-dashboard-bar'
    ) as HTMLCanvasElement;
    new ChartJs(canvasEl, {
      type: 'bar',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'This year',
            backgroundColor: themeConfigs.primary,
            borderColor: themeConfigs.primary,
            hoverBackgroundColor: themeConfigs.primary,
            hoverBorderColor: themeConfigs.primary,
            data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
            barPercentage: 0.75,
            categoryPercentage: 0.5,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              stacked: false,
              ticks: {
                stepSize: 20,
              },
            },
          ],
          xAxes: [
            {
              stacked: false,
              gridLines: {
                color: 'transparent',
              },
            },
          ],
        },
      },
    });
  }, []);

  return (
    <Card className=" flex-fill w-100">
      <Card.Header className="">
        <Card.Title className=" mb-0">Monthly Sales</Card.Title>
      </Card.Header>
      <Card.Body className=" d-flex w-100">
        <div className="align-self-center chart chart-lg">
          <canvas id="chartjs-dashboard-bar" />
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardChartsBar;
