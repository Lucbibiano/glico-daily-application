import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public showNotificationBar(
    message: string,
    button: string,
    timeout: number,
  ): void {
    this.snackBar.open(message, button, {
      duration: timeout,
      panelClass: ['snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
