import { ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password1: string = control.get("password1").value; // get password from our password form control
    const password2: string = control.get("password2").value; // get password from our password2 form control
    // compare is the password math
    if (password1 !== password2) {
      // if they don't match, set an error in our password2 form control
      control.get("password2").setErrors({ NoPassswordMatch: true });
    }
  }

  static changepasswordMatchValidator(control: AbstractControl) {
    const new_password1: string = control.get("new_password1").value; // get password from our password form control
    const new_password2: string = control.get("new_password2").value; // get password from our new_password2 form control
    // compare is the password math
    if (new_password1 !== new_password2) {
      // if they don't match, set an error in our new_password2 form control
      control.get("new_password2").setErrors({ NoPassswordMatch: true });
    }
  }
}
