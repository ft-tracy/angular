import {  AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control:AbstractControl): ValidationErrors | null => {
    const NewPassword = control.get('NewPassword');
    const ConfirmPassword = control.get('ConfirmPassword');

    if (!NewPassword || !ConfirmPassword){
        return null;
    }

    return NewPassword.value === ConfirmPassword.value ? null : { passwordMismatch: true }
}
