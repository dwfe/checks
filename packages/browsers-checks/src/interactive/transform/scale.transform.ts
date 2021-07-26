import {map, Observable, withLatestFrom} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {InteractiveVariant, ITransformData, ITransformGenerator} from '../contract'
import {WrapHandler} from '../handler'

export class ScaleTransform implements ITransformGenerator {

  constructor(private handler: WrapHandler) {
  }

  /**
   * deltaMode - единица измерения длины прокручиваемых значений: 0 = pixels, 1 = lines, 2 = pages
   *    deltaX - прокрутка влево/вправо
   *    deltaY - вверх/вниз
   *    deltaZ - вдоль оси Z
   */
  protected getScale(event: WheelEvent) {
    let factor = 0.002;
    if (event.deltaMode === 1)
      factor *= 100 / 3;
    return Math.pow(2, event.deltaY * factor * (event.shiftKey ? 0.1 : 1) * (event.ctrlKey ? 4 : 1));
  }

  data$: Observable<ITransformData> = this.handler.wheel$.pipe(
    withLatestFrom(this.handler.cursorPos$),
    map(([wheel, cursorPos]) => {
      const result: ITransformData = {
        matrix: WebMatrix.scaleAtPoint(cursorPos.pagePoint, this.getScale(wheel))
      }
      if (cursorPos.extra)
        result.extra = {
          variant: InteractiveVariant.SCALE,
          target: cursorPos.extra.target,
          event: cursorPos,
        }
      return result
    })
  )

}
