import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export class ValidationUtils {

  isInvalid( control: AbstractControl ): void {
    // @ts-ignore
    return control.errors && control.touched;
  }

  getMessage( errorName: string, errorValue: any ): void {
    // console.log( 'errorName', errorName );
    // console.log( 'errorValue', errorValue );
    switch ( errorName ) {
      case 'required':
        // @ts-ignore
        return 'Campo requerido';
      case 'email':
        // @ts-ignore
        return 'El correo no es válido';
      case 'pattern':
        // @ts-ignore
        return 'No cumple con el formato permitido';
      case 'minlength':
        // @ts-ignore
        return `Debe tener al menos ${errorValue.requiredLength} caracteres`;
      case 'maxlength':
        // @ts-ignore
        return `Sólo se permiten ${errorValue.requiredLength} caracteres`;
      default:
        return null;
    }
  }

  isValidEmail( control: AbstractControl ): { [ key: string ]: boolean } | null {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ( control.value && !emailPattern.test( control.value.toLowerCase() ) ) {
      return { email: true };
    }
    return null;
  }

  requiredAfterTrim( control: AbstractControl ): { [ key: string ]: boolean } | null {

    if ( control.value && control.value.trim() ) {
      return { required: true };
    }
    return null;
  }

  equalValues( key1: string, key2: string ): ValidatorFn {
    return ( group: FormGroup ): { [ key: string ]: boolean } | null => {
      const control1 = group.get( key1 );
      const control2 = group.get( key2 );

      if ( control1 && control1.value && control2 && control2.value ) {
        return control1.value === control2.value ? null : { notEquals: true };
      } else {
        return null;
      }
    };
  }

}
