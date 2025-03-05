import React from 'react';
import { Card } from 'react-bootstrap';
import ChartJs from '@configs/charts';
import chartsLineConfigs from '@configs/charts/chartsLineConfigs';

type Props = {};

function CardChartsLine({}: Props) {
  React.useEffect(() => {
    const ctxEl = document.getElementById(
      'chartjs-dashboard-line'
    ) as HTMLCanvasElement;

    const ctx = ctxEl.getContext('2d') as CanvasRenderingContext2D;
    const gradient = ctx.createLinearGradient(0, 0, 0, 225);
    gradient.addColorStop(0, 'rgba(215, 227, 244, 1)');
    gradient.addColorStop(1, 'rgba(215, 227, 244, 0)');
    new ChartJs(ctxEl, { ...chartsLineConfigs(gradient) });
  }, []);

  return (
    <Card className=" flex-fill w-100">
      <Card.Header>
        <Card.Title className=" mb-0">Recent Movement</Card.Title>
      </Card.Header>
      <Card.Body className="py-3">
        <div className="chart chart-sm">
          <canvas id="chartjs-dashboard-line" />
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardChartsLine;
