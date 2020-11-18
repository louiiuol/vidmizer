import { FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

/**
 * Provides Factory to create formsand handle their behaviors
 */
@Injectable({ providedIn: 'root' })
export class FormFactory {

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
    ) {
      this.fb = new FormBuilder();
    }

  /**
   * Returns an instance of Form Builder for custom Build
   */
    builder = (): FormBuilder => this.fb;

  /**
   * Displays given message in snackBar (pop up notification)
   */
    displayMessage = (message: string): MatSnackBarRef<SimpleSnackBar> =>
      this.snackBar.open(message, 'close', { duration: 3000 })

}
