import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
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
import { GlucoseService } from '../services/glucose.service';
import { NotificationService } from '../services/notification.service';
import { Glucose } from '../services/glucose.model';

@Component({
  selector: 'app-glucose-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './glucose-modal.component.html',
  styleUrl: './glucose-modal.component.scss',
})
export class GlucoseModalComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<boolean>();
  @Input() formDataToEdit!: Glucose;

  protected formGlucose: FormGroup;
  private isEditMode: boolean = false;

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

  public ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    if (this.formDataToEdit) {
      this.isEditMode = true;
      this.formGlucose.get('value')?.setValue(this.formDataToEdit.value);
      this.formGlucose
        .get('measurementType')
        ?.setValue(this.formDataToEdit.measurementType);
      this.formGlucose.get('note')?.setValue(this.formDataToEdit.note);
      this.formGlucose
        .get('measuredAt')
        ?.setValue(this.formDataToEdit.measuredAt);
    }
  }

  public ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  protected onClose(eventSave: boolean): void {
    this.close.emit(eventSave);
  }

  protected saveOrUpdate(): void {
    if (this.isEditMode) {
      this.update();
    } else {
      this.save();
    }
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

  protected update(): void {
    if (this.formGlucose.valid) {
      this.glucoseService
        .updateGlucose(this.formGlucose.value, this.formDataToEdit.id)
        .subscribe({
          next: () => {
            this.notificationService.showNotificationBar(
              'Registro de Glicose atualizado com sucesso!',
              'Fechar',
              4000,
            );
            this.formGlucose.reset();
            this.onClose(true);
          },
          error: () => {
            this.notificationService.showNotificationBar(
              'Ocorreu um erro ao atualziar a glicose. Tente novamente!',
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
}
