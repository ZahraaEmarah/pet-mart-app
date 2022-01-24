import { AbstractControl, FormGroup } from "@angular/forms";

export function passwordMatchValidator(control: FormGroup) {
    const pass = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (pass?.untouched || confirmPassword?.untouched)
        return null;

    return pass && confirmPassword && pass.value !== confirmPassword.value ? { passwordMismatch: true } : null;

};