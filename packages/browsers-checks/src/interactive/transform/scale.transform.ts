import {map, Observable} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {InteractiveVariant, ITransformData, ITransformGenerator} from '../contract'
import {ElementHandler, WrapHandler} from '../handler'

export class ScaleTransform implements ITransformGenerator {

  constructor(private handler: WrapHandler | ElementHandler) {
  }

  data$: Observable<ITransformData> = this.handler.move$.pipe(
    map(move => {
      const webMatrix = WebMatrix.of()
        .translate(move.pagePoint[0], move.pagePoint[1])
        .invert()
        .scale(1.01)
        .translate(move.pagePoint[0], move.pagePoint[1])
      return {
        variant: InteractiveVariant.SCALE,
        matrix: webMatrix.m,
        target: move.target,
        event: move,
      }
    })
  )

}
