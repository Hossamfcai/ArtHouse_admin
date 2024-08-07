import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static passWordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasNumber = /[0-9]/.test(value);
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const specialCharactersPattern = /[!@#$%^&*()-+=\\[\]{}|;:'",.<>/?]/.test(
        value
      );
      const isValidLength = value.length >= 8;
      const passwordValid =
        hasNumber &&
        hasUpper &&
        hasLower &&
        isValidLength &&
        specialCharactersPattern;

      return !passwordValid ? { passwordstrength: true } : null;
    };
  }
  static matchPassword(form: AbstractControl): ValidationErrors | null {
    const password = form.get('newPassword')?.value;
    const retypePassword = form.get('confirmNewPassword')?.value;
    if (password !== retypePassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
