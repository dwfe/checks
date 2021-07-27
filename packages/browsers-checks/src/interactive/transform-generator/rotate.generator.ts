import {filter, map, Observable} from '@do-while-for-each/rxjs'
import {TWebMatrix, WebMatrix} from '@do-while-for-each/math'
import {ITransformGenerator} from '../contract'
import {WheelFactor} from './wheel.factor'
import {RectHandler} from '../handler'

export class RotateGenerator implements ITransformGenerator {

  constructor(private wheel$: Observable<WheelEvent>,
              private rectHandler: RectHandler) {
  }

  data$: Observable<TWebMatrix> = this.wheel$.pipe(
    filter(e => !!e.altKey),
    map(event =>
      WebMatrix.rotateAtPoint(
        this.rectHandler.pagePointFromEvent(event),
        WheelFactor.rotation(event)
      )
    ),
  );

}
