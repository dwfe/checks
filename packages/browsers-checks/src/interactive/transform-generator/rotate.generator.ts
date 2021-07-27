import {filter, map, Observable} from '@do-while-for-each/rxjs'
import {TWebMatrix, WebMatrix} from '@do-while-for-each/math'
import {ITransformGenerator} from '../contract'
import {WheelFactor} from './wheel.factor'
import {toPagePointEvent} from '../event'
import {WrapHandler} from '../handler'

export class RotateGenerator implements ITransformGenerator {

  constructor(private handler: WrapHandler) {
  }

  data$: Observable<TWebMatrix> = this.handler.wheel$.pipe(
    filter(e => !!e.altKey),
    map(event => {
      const {pagePoint} = toPagePointEvent(event, this.handler.rectHandler)
      return WebMatrix.rotateAtPoint(pagePoint, WheelFactor.rotation(event))
    }),
  );

}
