import {Injectable} from '@angular/core';
import {ValidatorFn, AbstractControl} from '@angular/forms';
import {Subscription} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ControlMessagesService {
    constructor() {
    }

    static getValidatorErrorMessage(
        validatorName: string,
        validatorValue?: any
    ) {
        const config = {
            required: '(*) El campo es requerido.',
            email: 'El correo no es válido.',
            isEmail: 'Formato de correo no es válido',
            invalidPassword:
                'Contraseña inválida. La contraseña debe tener al menos 6 caracteres y debe contener un número.',
            min: `Mínimo valor permitido ${validatorValue.min}`,
            max: `Máximo valor permitido ${validatorValue.max}`,
            minlength: `Mínimo de caracteres permitidos ${
                validatorValue.requiredLength
            }`,
            maxlength: `Máximo de caracteres permitidos ${
                validatorValue.requiredLength
            }`,
            isnumber: 'Permitido solo números.',
            isdecimal: 'Permitido solo números enteros y decimales.',
            pattern: 'El valor no es permitido.',
            isequals: 'El valor no es permitido.',
            match: 'Introduzca el mismo valor de nuevo.',
            whitespace: 'El valor no es permitido.',
            securitypassword: 'El Password ingresado no es seguro.',
            isMultiAlphanumeric: 'Campo solo admite letras y números.',
            isMultiAlphanumericSimbol:
                'Campo admite solo letras, números y/o símbolos válidos',
            isMultiAlphaWithHyphen: 'Campo no válido.', // 'Campo no admite carácteres especiales, excepto guión(-).',
            isRUC: 'El RUC ingresado no válido.'
        };
        return config[validatorName];
    }

    static isNumber(control) {
        const NUMBER_REGEXP = /^[0-9]+$/;
        return NUMBER_REGEXP.test(control.value)
            ? null
            : {
                isnumber: {
                    valid: false
                }
            };
    }

    static isDecimal(control) {
        const DECIMAL_REGEXP = /^[.\d]+$/;
        return DECIMAL_REGEXP.test(control.value)
            ? null
            : {
                isdeciaml: {
                    valid: false
                }
            };
    }

    static isEmptyInputValue(value: any) {
        return value == null ||
        (typeof value === 'string' && value.length === 0) ||
        (typeof value === 'object' && value.length)
            ? {required: {valid: true}}
            : null;
    }

    static matchOtherValidator(otherControlName: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const otherControl: AbstractControl = control.root.get(
                otherControlName
            );

            if (otherControl) {
                const subscription: Subscription = otherControl.valueChanges.subscribe(
                    () => {
                        control.updateValueAndValidity();
                        subscription.unsubscribe();
                    }
                );
            }

            return otherControl && control.value !== otherControl.value
                ? {match: true}
                : null;
        };
    }

    static noWhitespace(control: any) {
        const isWhitespace = control.value
            ? control.value.indexOf(' ') > -1
            : null;
        return !isWhitespace ? null : {whitespace: true};
    }

    static securityPassword(control: any) {
        const patters = new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/
        );
        return patters.test(control.value) ? null : {securitypassword: true};
    }

    static isMultiAlphanumeric(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (this.isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            // const regex = new RegExp('^[0-9a-zA-ZÁÉÍÑÓÚÜáéíóúüñ ]+$');
            const regex = new RegExp(
                '^\\s*(\\w|[ÁÉÍÑÓÚÜáéíóúüñ])+(\\s(\\w|[ÁÉÍÑÓÚÜáéíóúüñ])*)*$'
            );
            const value: string = control.value;
            return regex.test(value)
                ? null
                : {
                    isMultiAlphanumeric: {
                        requiredPattern: 'only allow letters y numbers',
                        actualValue: value
                    }
                };
        };
    }

    /**
     * Permite validar caracteres alfanumericos con excepciones (permite solo guión - )
     */
    static isMultiAlphaWithHyphen(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (this.isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            const regex = new RegExp('^([a-zA-Z0-9 -])*$');
            const value: string = control.value;
            return regex.test(value)
                ? null
                : {
                    isMultiAlphaWithHyphen: {
                        requiredPattern: 'only allow letters with hyphen',
                        actualValue: value
                    }
                };
        };
    }

    static isEmail(control: any) {
        const patters = new RegExp(/\S+@\S+\.\S+/);
        return patters.test(control.value) ? null : {isEmail: true};
    }

    static isRuc(control: AbstractControl): { [key: string]: any } {
        const valor: any = String(control.value);
        let suma: any;
        let digito: any;
        let resto: any;
        let x: any;
        if (Number(valor)) {
            if (valor.length === 11) {
                suma = 0;
                x = 6;
                for (let i = 0; i < valor.length - 1; i++) {
                    if (i === 4) {
                        x = 8;
                    }
                    digito = valor.charAt(i) - 0;
                    x--;
                    if (i === 0) {
                        suma += digito * x;
                    } else {
                        suma += digito * x;
                    }
                }
                resto = suma % 11;
                resto = 11 - resto;

                if (resto >= 10) {
                    resto = resto - 10;
                }
                if (resto === valor.charAt(valor.length - 1) - 0) {
                    return null;
                }
            }
        }
        return {isRUC: 'is ruc no valid'};
    }

    private isEmptyInputValue(value: any) {
        return (
            value == null || (typeof value === 'string' && value.length === 0)
        );
    }
}
