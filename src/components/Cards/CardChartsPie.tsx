import React from 'react';
import { Card, Table } from 'react-bootstrap';
import ChartJs from '@configs/charts';
import themeConfigs from '@configs/themeConfigs';

type Props = {};

function CardChartsPie({}: Props) {
  React.useEffect(() => {
    const elementEl = document.getElementById(
      'chartjs-dashboard-pie'
    ) as HTMLCanvasElement;
    new ChartJs(elementEl, {
      type: 'pie',
      data: {
        labels: ['Chrome', 'Firefox', 'IE'],
        datasets: [
          {
            data: [4306, 3801, 1689],
            backgroundColor: [
              themeConfigs.primary,
              themeConfigs.warning,
              themeConfigs.danger,
            ],
            borderWidth: 5,
          },
        ],
      },
      options: {
        responsive: !window.MSInputMethodContext,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        cutoutPercentage: 75,
      },
    });
  }, []);

  return (
    <Card className=" flex-fill w-100">
      <Card.Header>
        <Card.Title as="h5" className="mb-0">
          Browser Usage
        </Card.Title>
      </Card.Header>
      <Card.Body className="d-flex">
        <div className="align-self-center w-100">
          <div className="py-3">
            <div className="chart chart-xs">
              <canvas id="chartjs-dashboard-pie" />
            </div>
          </div>
          <Table className="table mb-0">
            <tbody>
              <tr>
                <td>Chrome</td>
                <td className="text-end">4306</td>
              </tr>
              <tr>
                <td>Firefox</td>
                <td className="text-end">3801</td>
              </tr>
              <tr>
                <td>IE</td>
                <td className="text-end">1689</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardChartsPie;
