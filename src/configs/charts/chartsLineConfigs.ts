import Chart from 'chart.js';
import themeConfigs from '@configs/themeConfigs';

const chartsLineConfigs = (gradient: CanvasGradient) =>
  <Chart.ChartConfiguration>{
    type: 'line',
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
          label: 'Sales ($)',
          fill: true,
          backgroundColor: gradient,
          borderColor: themeConfigs.primary,
          data: [
            2115, 1562, 1584, 1892, 1587, 1923, 2566, 2448, 2805, 3438, 2917,
            3327,
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        intersect: false,
      },
      hover: {
        intersect: true,
      },
      plugins: {
        filler: {
          propagate: false,
        },
      },
      scales: {
        xAxes: [
          {
            // reverse: true,
            gridLines: {
              color: 'rgba(0,0,0,0.0)',
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              stepSize: 1000,
            },
            display: true,
            // borderDash: [3, 3],
            gridLines: {
              color: 'rgba(0,0,0,0.0)',
            },
          },
        ],
      },
    },
  };

export default chartsLineConfigs;
