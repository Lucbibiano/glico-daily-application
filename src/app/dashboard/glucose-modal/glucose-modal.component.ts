import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GlucoseService } from '../../services/glucose.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-glucose-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './glucose-modal.component.html',
  styleUrl: './glucose-modal.component.scss',
})
export class GlucoseModalComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<boolean>();

  protected formGlucose: FormGroup;

  constructor(
    private glucoseService: GlucoseService,
    private notificationService: NotificationService,
  ) {
    this.formGlucose = new FormGroup({
      value: new FormControl(null, [
        Validators.required,
        Validators.min(20),
        Validators.max(800),
      ]),
      measurementType: new FormControl(null, Validators.required),
      note: new FormControl(''),
    });
  }

  protected onClose(eventSave: boolean) {
    this.close.emit(eventSave);
  }

  protected save(): void {
    if (this.formGlucose.valid) {
      this.glucoseService.createGlucose(this.formGlucose.value).subscribe({
        next: () => {
          this.notificationService.showNotificationBar(
            'Registro de Glicose criado com sucesso!',
            'Fechar',
            4000,
          );
          this.formGlucose.reset();
          this.onClose(true);
        },
        error: () => {
          this.notificationService.showNotificationBar(
            'Ocorreu um erro ao registrar a glicose. Tente novamente!',
            'Fechar',
            4000,
          );
        },
      });
    }
  }

  protected isInvalidField(field: string): boolean {
    const control = this.formGlucose.get(field);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  public ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  public ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}
