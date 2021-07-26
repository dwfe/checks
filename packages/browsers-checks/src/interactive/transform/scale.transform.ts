import {map, Observable, withLatestFrom} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {InteractiveVariant, ITransformData, ITransformGenerator} from '../contract'
import {WrapHandler} from '../handler'

export class ScaleTransform implements ITransformGenerator {

  constructor(private handler: WrapHandler) {
  }

  data$: Observable<ITransformData> = this.handler.wheel$.pipe(
    withLatestFrom(this.handler.cursorPos$),
    map(([wheel, cursorPos]) => {
      const factor = wheel.deltaY < 0 ? 1.1 : 0.9;
      const result: ITransformData = {
        matrix: WebMatrix.scaleAtPoint(cursorPos.pagePoint, factor)
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
