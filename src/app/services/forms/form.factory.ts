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

    builder = (): FormBuilder => this.fb;

    displayMessage = (message: any): MatSnackBarRef<SimpleSnackBar> =>
      this.snackBar.open(message, 'close', { duration: 3000 })

}
