import { Component, OnInit } from '@angular/core';
import {
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexMarkers,
  ApexTooltip,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';

import {
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

@Component({
  selector: 'app-dashboard',
  imports: [NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  response = [
    { date: '2026-03-01', value: 95 },
    { date: '2026-03-02', value: 110 },
    { date: '2026-03-03', value: 104 },
    { date: '2026-03-03', value: 104 },
    { date: '2026-03-03', value: 104 },
    { date: '2026-03-03', value: 104 },
    { date: '2026-03-03', value: 104 },
    { date: '2026-03-01', value: 95 },
    { date: '2026-03-02', value: 110 },
    { date: '2026-03-03', value: 104 },
    { date: '2026-03-03', value: 104 },
    { date: '2026-03-03', value: 104 },
    { date: '2026-03-03', value: 104 },
    { date: '2026-03-03', value: 104 },
  ];

  chartOptions: ChartOptions = {
    series: [
      {
        name: 'Glicose',
        data: [95, 110, 104, 120, 108, 100],
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

  ngOnInit(): void {
    this.chartOptions.series = [
      {
        name: 'Glicose',
        data: this.response.map((r) => r.value),
      },
    ];

    this.chartOptions.xaxis = {
      categories: this.response.map((r) => r.date),
      type: 'category',
      labels: {
        rotate: -35,
      },
    };
  }
}
