import {
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions, chartOptions } from './chart.model';
import { GlucoseService } from '../services/glucose.service';
import { map } from 'rxjs';
import { Glucose } from '../services/glucose.model';
import { formatDate } from '@angular/common';
import { GlucoseModalComponent } from './glucose-modal/glucose-modal.component';

@Component({
  selector: 'app-dashboard',
  imports: [NgApexchartsModule, GlucoseModalComponent],
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

  private loadChartSettings(): void {
    this.chartOptions = chartOptions;
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
          return resp.map((glucose) => ({
            date: formatDate(glucose.measuredAt, 'short', this.locale),
            value: glucose.value,
          }));
        }),
      )
      .subscribe((resp) => {
        this.chartData = resp.reverse();
        this.loadChartSettings();
      });
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

  public ngOnInit(): void {
    this.loadChartData();
  }
}
