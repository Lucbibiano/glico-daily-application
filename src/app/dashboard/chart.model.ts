import {
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexMarkers,
  ApexTooltip,
  ApexYAxis,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  fill: ApexFill;
  grid: ApexGrid;
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  tooltip: ApexTooltip;
  colors: string[];
  dataLabels: ApexDataLabels;
};

export const chartOptions: ChartOptions = {
  series: [
    {
      name: 'Glicose',
      data: [],
    },
  ],
  chart: {
    type: 'area',
    height: 420,
    width: '100%',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  colors: ['#0ea5e9'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      shadeIntensity: 0.7,
      opacityFrom: 0.82,
      opacityTo: 0.38,
      stops: [0, 70, 100],
    },
  },
  markers: {
    size: 3,
    strokeWidth: 0,
    hover: { size: 5 },
  },
  tooltip: {
    enabled: true,
    x: { show: true },
  },
  xaxis: {
    categories: ['01 Mar', '02 Mar', '03 Mar', '04 Mar', '05 Mar'],
    type: 'category',
    labels: {
      rotate: -35,
    },
  },
  yaxis: {
    min: 90,
    max: 115,
    tickAmount: 5,
  },
  grid: {
    borderColor: '#e5e7eb',
    strokeDashArray: 4,
  },
};
