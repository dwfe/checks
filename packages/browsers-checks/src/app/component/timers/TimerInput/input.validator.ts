import {isNumber} from '@do-while-for-each/math'

export class InputValidator {

  static isPositiveNumberValidFn(data, isNumberValidFn): boolean {
    if (data === '')
      return false;   // IF empty string -> invalid
    const value = +data
    if (!isNumberValidFn(value))
      return false;   // IF not a number -> invalid
    return value >= 0 // ELSE number must be positive
  }

  static isCountValidFn(data): boolean {
    return InputValidator.isPositiveNumberValidFn(data, Number.isInteger) // кол-во таймеров - целые
  }

  static isIntervalValidFn(data) {
    return InputValidator.isPositiveNumberValidFn(data, isNumber) // интервал каждого таймера в секундах - дробные
  }

  static invalidClassName(value: string, isValidFn): string {
    return isValidFn(value) ? '' : 'input-invalid'
  }

}
