import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-modal',
  imports: [],
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.scss',
})
export class GenericModalComponent implements OnInit, OnDestroy{
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @Input() modalTitle: string = '';
  @Input() closeButtonTitle: string = 'Fechar';
  @Input() confirmButtonTitle: string = 'OK';
  @Input() disableConfirm: boolean = false;
  @Input() disableCancel: boolean = false;

  protected onClose() {
    this.close.emit();
  }

  protected onConfirm() {
    this.confirm.emit();
  }

  public ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  public ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}
