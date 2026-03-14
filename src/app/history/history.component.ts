import { Component, OnInit } from '@angular/core';
import { GlucoseService } from '../services/glucose.service';
import { TableModule } from 'primeng/table';
import { Glucose } from '../services/glucose.model';
import { DatePipe } from '@angular/common';
import { MeasurementTranslatePipe } from '../pipes/measurement-translate.pipe';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { NotificationService } from '../services/notification.service';

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
  constructor(
    private glucoseService: GlucoseService,
    private notificationService: NotificationService,
  ) {}

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

  private confirmDelete(): void {
    this.changeButtonStatus(false);
    this.onCloseModal();
    this.notificationService.showNotificationBar(
      'Registro deletado com sucesso!',
      'Fechar',
      4000,
    );
    this.loadHistory();
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
        this.confirmDelete();
      },
      error: () => {
        this.changeButtonStatus(true);
        this.onCloseModal();
        this.notificationService.showNotificationBar(
          'Ocorreu um erro ao deletar o registro. Tente novamente!',
          'Fechar',
          4000,
        );
      },
    });
  }
}
