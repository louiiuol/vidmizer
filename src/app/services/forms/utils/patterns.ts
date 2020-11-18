import { AbstractControl } from '@angular/forms';
/**
 * Global Patterns for Form fields
 */
export const Patterns = {

  alphanumeric: /^[\w\s!.:,? éèà']+$/,
  numbers: /\d/g,

  isValid: (ctrl: AbstractControl, err: any): boolean => ctrl.hasError(err.type) && (ctrl.dirty || ctrl.touched),

  isEmpty: (str: string): boolean => (!str || 0 === str.length),

  isBlank: (str: string): boolean => (!str || /^\s*$/.test(str)),

};
