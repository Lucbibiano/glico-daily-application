import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { chartOptions } from './chart.model';
import { GlucoseService } from '../services/glucose.service';
import { map } from 'rxjs';
import { Glucose } from '../services/glucose.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private glucoseService: GlucoseService, @Inject(LOCALE_ID) private locale: string) {}

  public chartOptions = chartOptions;

  chartData: Array<{ date: string; value: number }> = [];

  ngOnInit(): void {
    this.loadChartData();
  }

  private loadChartSettings(): void {
    this.chartOptions.series = [
      {
        name: 'Glicose',
        data: this.chartData.map((r) => r.value),
      },
    ];

    this.chartOptions.xaxis = {
      categories: this.chartData.map((r) => r.date),
      type: 'category',
      labels: {
        rotate: -35,
      },
    };
  }

  private loadChartData(): void {
    this.glucoseService
      .getGlucoseHistory()
      .pipe(
        map((resp: Array<Glucose>) => {
          const chart: Array<{ date: string; value: number }> = [];
          resp.forEach((glucose) => {
            chart.push({ date: formatDate(glucose.measuredAt, 'short', this.locale), value: glucose.value });
          });
          return chart;
        }),
      )
      .subscribe((resp) => {
        this.chartData = this.chartData.concat(resp);
        this.loadChartSettings();
      });
  }
}
