import { ValidatorFn, AbstractControl } from '@angular/forms';

/**
 * Walidator dla podawania hasła w formularzach. Sprawdza czy hasło i jego
 * powtórka są identyczne.
 *
 * @param secondPasswordFormField input z powtórzeniem hasła
 */
export function passwordRepeatValidator(secondPasswordFormField: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && secondPasswordFormField.value !== undefined &&
            control.value !== null && secondPasswordFormField.value !== null) {
            if (control.value !== secondPasswordFormField.value) {
                return { passwordsMismatch: true };
            } else {
                return null;
            }
        }
    };
}

/**
 * Walidator dla podawania hasła w formularzach. Sprawdza czy hasło i jego
 * powtórka są identyczne.
 *
 * @param secondPasswordFormField input z powtórzeniem hasła
 */
export function setScoreValidator(): ValidatorFn {
    let validScore;
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined &&
            control.value !== null) {
            const points = (control.value as string).split(':');
            if (points.length > 2 || points.length === 0) {
                validScore = false;
            } else {
                try {
                    if ((points[0].length === 2 && points[0][0] === '0') ||
                        points[1].length === 2 && points[1][0] === '0') {
                        throw Error();
                    }
                    const homePlayerPoints = Number.parseInt(points[0], 10);
                    const awayPlayersPoints = Number.parseInt(points[1], 10);
                    validScore = isSetScoreValid(homePlayerPoints, awayPlayersPoints);
                } catch (error) {
                    validScore = false;
                }
            }
        } else {
            validScore = false;
        }
        return validScore ? null : { invalidSetPoints: true };
    };
}


function isSetScoreValid(homePlayerPoints: number, awayPlayersPoints: number) {
    const MAX_POINTS_IN_SET = 11;
    let isValid = true;

    if (awayPlayersPoints === homePlayerPoints) {
        isValid = false;
    }
    if (homePlayerPoints > awayPlayersPoints) {
        if (homePlayerPoints > MAX_POINTS_IN_SET) {
            return homePlayerPoints - awayPlayersPoints === 2;
        } else if (homePlayerPoints === MAX_POINTS_IN_SET) {
            isValid = true;
        } else {
            isValid = false;
        }
    }
    if (awayPlayersPoints > homePlayerPoints) {
        if (awayPlayersPoints > MAX_POINTS_IN_SET) {
            return awayPlayersPoints - homePlayerPoints === 2;
        } else if (awayPlayersPoints === MAX_POINTS_IN_SET) {
            isValid = true;
        } else {
            isValid = false;
        }
    }
    return isValid;
}
