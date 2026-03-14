import { Component, OnInit } from '@angular/core';
import { GlucoseService } from '../services/glucose.service';
import { TableModule } from 'primeng/table';
import { Glucose } from '../services/glucose.model';
import { DatePipe } from '@angular/common';
import { MeasurementTranslatePipe } from '../pipes/measurement-translate.pipe';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { NotificationService } from '../services/notification.service';
import { GlucoseModalComponent } from '../glucose-modal/glucose-modal.component';
import { ACTION } from '../glucose-modal/action.model';

@Component({
  selector: 'app-history',
  imports: [
    TableModule,
    DatePipe,
    MeasurementTranslatePipe,
    GenericModalComponent,
    GlucoseModalComponent,
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
  protected showEditModal: boolean = false;
  protected glucoseItem!: Glucose;
  protected disableConfirm: boolean = false;
  protected disableCancel: boolean = false;

  public ngOnInit(): void {
    this.loadHistory();
  }

  protected onOpenModal(item: Glucose, actionType: string): void {
    this.glucoseItem = item;
    if (actionType === ACTION.DELETE) {
      this.showDeleteModal = true;
    } else {
      this.showEditModal = true;
    }
  }

  protected onCloseModal(actionType: string): void {
    this.resetGlucose();
    if (actionType === ACTION.DELETE) {
      this.showDeleteModal = false;
    } else {
      this.showEditModal = false;
      this.loadHistory();
    }
  }

  protected onConfirmDeleteModal(): void {
    this.changeButtonStatus(true);
    this.delete();
  }

  protected delete(): void {
    this.glucoseService.deleteGlucoseRecord(this.glucoseItem.id).subscribe({
      next: () => {
        this.confirmDelete();
      },
      error: () => {
        this.changeButtonStatus(true);
        this.onCloseModal(ACTION.DELETE);
        this.notificationService.showNotificationBar(
          'Ocorreu um erro ao deletar o registro. Tente novamente!',
          'Fechar',
          4000,
        );
      },
    });
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
    this.onCloseModal(ACTION.DELETE);
    this.notificationService.showNotificationBar(
      'Registro deletado com sucesso!',
      'Fechar',
      4000,
    );
    this.loadHistory();
  }

  private resetGlucose(): void {
    Object.keys(this.glucoseItem).forEach((key) => {
      (this.glucoseItem as any)[key] = undefined;
    });
  }
}
