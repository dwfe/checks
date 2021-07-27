import {filter, map, Observable} from '@do-while-for-each/rxjs'
import {TWebMatrix, WebMatrix} from '@do-while-for-each/math'
import {ITransformGenerator} from '../contract'
import {WheelFactor} from './wheel.factor'
import {WrapHandler} from '../handler'

export class RotateGenerator implements ITransformGenerator {

  constructor(private handler: WrapHandler) {
  }

  data$: Observable<TWebMatrix> = this.handler.wheel$.pipe(
    filter(e => !!e.altKey),
    map(event => (
      WebMatrix.rotateAtPoint(
        this.handler.rectHandler.pagePointFromEvent(event),
        WheelFactor.rotation(event)
      ))
    ),
  );

}
