import {filter, map, Observable, withLatestFrom} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {ITransformData, ITransformGenerator} from '../contract'
import {WheelFactor} from './wheel.factor'
import {WrapHandler} from '../handler'

export class RotateTransform implements ITransformGenerator {

  constructor(private handler: WrapHandler) {
  }

  data$: Observable<ITransformData> = this.handler.wheel$.pipe(
    filter(e => !!e.altKey),
    withLatestFrom(this.handler.cursorPos$),
    map(([wheel, cursorPos]) => {
      return {
        matrix: WebMatrix.rotateAtPoint(cursorPos.pagePoint, WheelFactor.rotation(wheel))
      }
    })
  );

}
