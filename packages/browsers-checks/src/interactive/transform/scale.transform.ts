import {filter, map, Observable, withLatestFrom} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {InteractiveVariant, ITransformData, ITransformGenerator} from '../contract'
import {WheelFactor} from './wheel.factor'
import {WrapHandler} from '../handler'

export class ScaleTransform implements ITransformGenerator {

  constructor(private handler: WrapHandler) {
  }

  data$: Observable<ITransformData> = this.handler.wheel$.pipe(
    filter(e => !e.altKey),
    withLatestFrom(this.handler.cursorPos$),
    map(([wheel, cursorPos]) => {
      const result: ITransformData = {
        matrix: WebMatrix.scaleAtPoint(cursorPos.pagePoint, WheelFactor.scale(wheel))
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
