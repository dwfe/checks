/**
 * WheelEvent.deltaMode - единица измерения длины прокручиваемых значений: 0 = pixels, 1 = lines, 2 = pages
 *           .deltaX    - прокрутка влево/вправо
 *           .deltaY    - вверх/вниз
 *           .deltaZ    - вдоль оси Z
 */
export class WheelFactor {

  static scale(event: WheelEvent, factor = 0.002): number {
    if (event.deltaMode === 1)
      factor *= 100 / 3;
    return Math.pow(2, event.deltaY * factor * (event.shiftKey ? 0.1 : 1) * (event.ctrlKey ? 4 : 1));
  }

  /**
   * @returns - angle in radians
   */
  static rotation(event: WheelEvent, factor = 0.05): number {
    if (event.deltaMode === 1)
      factor *= 100 / 3;
    return event.deltaY * factor * (event.shiftKey ? .1 : 1);
  }

}
