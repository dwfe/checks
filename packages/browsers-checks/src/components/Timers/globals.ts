import {isNumeric} from '../../utils/globals';

//region Validators

const isPositiveNumberValidFn = (data, isNumberValidFn): boolean => {
  if (data === '')
    return false;   // IF empty string -> invalid
  const value = +data
  if (!isNumberValidFn(value))
    return false;   // IF not a number -> invalid
  return value >= 0 // ELSE number must be positive
}
export const isCountValidFn = data => isPositiveNumberValidFn(data, Number.isInteger)  // кол-во таймеров - целые
export const isIntervalValidFn = data => isPositiveNumberValidFn(data, isNumeric)     // интервал каждого таймера в секундах - дробные

export const invalidClass = (value: string, isValidFn) => isValidFn(value) ? '' : 'input-invalid'

//endregion


export const convertTimerParams = ([count, interval]: string[]): number[] | false =>
  isCountValidFn(count) && isIntervalValidFn(interval)
    ? [+count, +interval]
    : false
