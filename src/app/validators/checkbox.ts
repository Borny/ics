import { FormGroup, FormArray, ValidatorFn } from '@angular/forms';

export function requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
  // return function validate(formGroup: FormGroup) {
  return function validate(formGroup: FormGroup) {
    let checked = 0;

    console.log('validator')

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];

      if (control.value === true) {
        checked++;
      }
    });

    if (checked < minRequired) {
      console.log('validator false')
      return {
        requireOneCheckboxToBeChecked: true,
      };
    }

    console.log('validator true')
    return null;
  };
}
