import { AbstractControl, ValidationErrors } from '@angular/forms';
  
export class Validator {
    static passwordDoesNotMatch(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0){
            return {notMatch: true}
        }
  
        return null;
    }
}