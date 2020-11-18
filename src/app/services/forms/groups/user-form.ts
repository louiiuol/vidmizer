import { Validators, FormControl } from '@angular/forms';
import { Patterns } from '../utils/patterns';

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
