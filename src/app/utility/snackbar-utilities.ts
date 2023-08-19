import { MatSnackBar } from '@angular/material/snack-bar';

export function savedChangesSnackBar(message: string, snackBar: MatSnackBar): void {
  snackBar.open(message, 'OK', {
    duration: 5000,
  });
}
