import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';

export function endYearValidator(controls: {[key: string]: FormControl}) {
    return (control: AbstractControl): ValidationErrors | null => {
        const startYear = controls['startYear']?.value;
        const endYear = control.value;

        if (startYear > endYear) {
            return {
                invalidEndYear: {
                    message: 'End Year cannot be less than Start Year!',
                    startYear,
                    endYear
                }
            };
        }

        return null;
    };
}

export function startYearValidator(controls: {[key: string]: FormControl}) {
    return (control: AbstractControl): ValidationErrors | null => {
        const startYear = control.value;
        const endYear = controls['endYear']?.value;

        if (startYear > endYear) {
            return {
                invalidStartYear: {
                    message: 'Start Year cannot be greater than End Year!',
                    startYear,
                    endYear
                }
            };
        }

        return null;
    };
}
