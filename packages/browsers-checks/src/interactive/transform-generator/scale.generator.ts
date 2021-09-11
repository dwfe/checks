import {filter, map, Observable} from '@do-while-for-each/rxjs'
import {TWebMatrix, WebMatrix} from '@do-while-for-each/math'
import {ITransformGenerator} from '../contract'
import {WheelFactor} from './wheel.factor'
import {RectHandler} from '../handler'

export class ScaleGenerator implements ITransformGenerator {

  constructor(private wheel$: Observable<WheelEvent>,
              private rectHandler: RectHandler) {
  }

  matrix$: Observable<TWebMatrix> = this.wheel$.pipe(
    filter(e => !e.altKey),
    map(event => (
      WebMatrix.scaleAtPoint(
        this.rectHandler.pagePointFromEvent(event),
        WheelFactor.scale(event)
      ))
    ),
  )

}
