import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { GlucoseService } from '../services/glucose.service';
import { TableModule } from 'primeng/table';
import { Glucose } from '../services/glucose.model';
import { map } from 'rxjs/operators';
import { DatePipe, formatDate } from '@angular/common';
import { MeasurementTranslatePipe } from '../pipes/measurement-translate.pipe';

@Component({
  selector: 'app-history',
  imports: [TableModule, DatePipe, MeasurementTranslatePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  constructor(
    private glucoseService: GlucoseService,
    @Inject(LOCALE_ID) private locale: string,
  ) {}

  protected history: Array<Glucose> = [];

  public ngOnInit(): void {
    this.loadHistory();
  }

  private loadHistory(): void {
    this.glucoseService.getGlucoseHistory().subscribe({
      next: (list) => {
        this.history = list;
      },
      error: (error) => {
        console.log('Erro ao carregar o histórico.', error);
      },
    });
  }

  protected delete(item: Glucose): void {
    this.glucoseService.deleteGlucoseRecord(item.id)
    .subscribe({
      next: () => {
        console.log('Deletado com sucesso.');
        this.loadHistory();
      },
      error: (error) => {
        console.log('Erro ao deletar o registro.', error);
      },
    });
  }
}
