import { AbstractControl } from "@angular/forms";

export function passwordHasNameValidator(control: AbstractControl) {

    var pass = control.get('password');
    var fullName = control.get('fullName');
    if (pass?.untouched || fullName?.untouched)
        return null;

    return pass && fullName && pass.value.includes(fullName.value) ||
     pass?.value.localeCompare(fullName?.value) ? { passwordHasName: true } : null;
}