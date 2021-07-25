import {WebMatrix} from '@do-while-for-each/math'
import {map, Observable} from '@do-while-for-each/rxjs'
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
      const result: ITransformData = {
        matrix: webMatrix.m
      }
      if (move.extra)
        result.extra = {
          variant: InteractiveVariant.SCALE,
          target: move.extra.target,
          event: move,
        }
      return result
    })
  )

}
