import { Validators } from '@angular/forms';
import { Patterns } from '../utils/patterns';

/**
 * Form Group Models for User informations
 * specify constraints like length, patterns ..
 */
export const UserForm = {
  lastname: [null, [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(40),
    Validators.pattern(Patterns.alphanumeric)
  ]],
  firstname: [null, [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(40),
    Validators.pattern(Patterns.alphanumeric)
  ]],
  phone: [null, [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern(Patterns.numbers)
  ]],
  region: [null, [
    Validators.required
  ]]
};
