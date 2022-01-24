import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, map, firstValueFrom } from "rxjs";
import { UserAuthService } from "../Services/user-auth.service";
import { IUser } from "../Models/IUser";

export function uniqueEmailValidator(userService: UserAuthService) {
    var fetchedEmail = '';
    return async (control: AbstractControl) => {
        var fetchedUserArray = await firstValueFrom(userService.checkUniqueEmail(control.value));
        
        console.log(fetchedUserArray)
        if (fetchedUserArray.length > 0) {
            fetchedEmail = fetchedUserArray[0].email;
        }
        console.log("From user: " + control.value);
        console.log("From API: " + fetchedEmail);
        console.log(fetchedEmail == control.value)
        console.log(fetchedEmail == control.value ? { UniqueEmail: control.value } : null)
        const validationRes = { UniqueEmail: control.value };
        console.log("validation result " + validationRes.UniqueEmail.value);
        return fetchedEmail === control.value ? validationRes : null;
    }
}