import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions, chartOptions } from './chart.model';
import { GlucoseService } from '../services/glucose.service';
import { map } from 'rxjs';
import { Glucose } from '../services/glucose.model';
import { formatDate } from '@angular/common';
import { GlucoseModalComponent } from '../glucose-modal/glucose-modal.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  imports: [NgApexchartsModule, GlucoseModalComponent, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(
    private glucoseService: GlucoseService,
    @Inject(LOCALE_ID) private locale: string,
  ) {}

  @ViewChild('chart') chart?: ChartComponent;
  public chartOptions!: ChartOptions;

  protected chartData: Array<{ date: string; value: number }> = [];

  protected showGlucoseRegistryModal = false;

  public ngOnInit(): void {
    this.loadChartData();
  }

  protected openModalForm(): void {
    this.showGlucoseRegistryModal = true;
  }

  protected onCloseModal(eventSave: boolean): void {
    this.showGlucoseRegistryModal = false;
    if (eventSave) {
      this.loadChartData();
    }
  }
  
  private getChartYAxis(): ChartOptions['yaxis'] {
    if (!this.chartData.length) {
      return {
        min: 80,
        max: 180,
        tickAmount: 5,
      };
    }

    const values = this.chartData.map((item) => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue;
    const padding = Math.max(8, Math.ceil(range * 0.2));

    return {
      min: Math.max(0, minValue - padding),
      max: maxValue + padding,
      tickAmount: 5,
      forceNiceScale: true,
    };
  }

  private loadChartSettings(): void {
    this.chartOptions = {
      ...chartOptions,
      xaxis: {
        ...chartOptions.xaxis,
      },
      yaxis: {
        ...chartOptions.yaxis,
      },
    };

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

    this.chartOptions.yaxis = this.getChartYAxis();
  }

  private loadChartData(): void {
    this.glucoseService
      .getGlucoseHistory()
      .pipe(
        map((resp: Array<Glucose>) => {
          return resp.map((glucose) => ({
            date: formatDate(glucose.measuredAt, 'dd/MM/yy HH:mm', this.locale),
            value: glucose.value,
          }));
        }),
      )
      .subscribe((resp) => {
        this.chartData = resp.reverse();
        this.loadChartSettings();
      });
  }
}
