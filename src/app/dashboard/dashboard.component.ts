import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

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
  ];

  chartOptions: ChartOptions = {
    series: [
      {
        name: 'Glicose',
        data: [],
      },
    ],
    chart: {
      type: 'line',
      height: 350,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    },
  };

  ngOnInit(): void {

    this.chartOptions.series[0].data = [10, 11, 12, 13, 14, 15]
    this.chartOptions.series = [
      {
        name: 'Glicose',
        data: this.response.map((r) => r.value),
      },
    ];

    this.chartOptions.xaxis = {
      categories: this.response.map((r) => r.date),
    };
  }
}
