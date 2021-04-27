import {map, Observable} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {InteractiveVariant, ITransformData, ITransformGenerator} from '../contract'
import {WrapHandler} from '../handler'

export class ScaleTransform implements ITransformGenerator {

  constructor(private handler: WrapHandler) {
  }

  data$: Observable<ITransformData> = this.handler.move$.pipe(
    map(move => {
      const matrix = WebMatrix.of()
        .translate(move.pagePoint.x, move.pagePoint.y)
        .invert()
        .scale(1.01)
        .translate(move.pagePoint.x, move.pagePoint.y)
      return {
        type: InteractiveVariant.SCALE,
        matrix,
        target: move.target,
        event: move,
      }
    })
  )

}
