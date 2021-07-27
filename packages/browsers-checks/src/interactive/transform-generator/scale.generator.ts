import {filter, map, Observable} from '@do-while-for-each/rxjs'
import {TWebMatrix, WebMatrix} from '@do-while-for-each/math'
import {ITransformGenerator} from '../contract'
import {WheelFactor} from './wheel.factor'
import {WrapHandler} from '../handler'

export class ScaleGenerator implements ITransformGenerator {

  constructor(private handler: WrapHandler) {
  }

  data$: Observable<TWebMatrix> = this.handler.wheel$.pipe(
    filter(e => !e.altKey),
    map(event => (
      WebMatrix.scaleAtPoint(
        this.handler.rectHandler.pagePointFromEvent(event),
        WheelFactor.scale(event)
      ))
    ),
  )

}
