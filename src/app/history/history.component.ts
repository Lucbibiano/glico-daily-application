import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { GlucoseService } from '../services/glucose.service';
import { TableModule } from 'primeng/table';
import { Glucose } from '../services/glucose.model';
import { map } from 'rxjs/operators';
import { DatePipe, formatDate } from '@angular/common';
import { MeasurementTranslatePipe } from '../pipes/measurement-translate.pipe';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';

@Component({
  selector: 'app-history',
  imports: [
    TableModule,
    DatePipe,
    MeasurementTranslatePipe,
    GenericModalComponent,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  constructor(private glucoseService: GlucoseService) {}

  protected history: Array<Glucose> = [];
  protected showDeleteModal: boolean = false;
  private deleteId!: string | undefined;
  protected disableConfirm: boolean = false;
  protected disableCancel: boolean = false;

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

  private changeButtonStatus(status: boolean): void {
    this.disableCancel = status;
    this.disableConfirm = status;
  }

  protected onCloseModal(): void {
    this.showDeleteModal = false;
    this.deleteId = '';
  }

  protected onConfirmModal(): void {
    this.changeButtonStatus(true);
    this.delete();
  }

  protected openDeleteModal(item: Glucose): void {
    this.deleteId = item.id;
    this.showDeleteModal = true;
  }

  protected delete(): void {
    this.glucoseService.deleteGlucoseRecord(this.deleteId).subscribe({
      next: () => {
        console.log('Deletado com sucesso.');
        this.changeButtonStatus(false);
        this.onCloseModal();
        this.loadHistory();
      },
      error: (error) => {
        this.changeButtonStatus(true);
        this.onCloseModal();
        console.log('Erro ao deletar o registro.', error);
      },
    });
  }
}
