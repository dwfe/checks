import {map, Observable} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {IElementHandler, InteractiveVariant, ITransformData, ITransformGenerator} from '../contract'

export class ScaleTransform implements ITransformGenerator {

  constructor(private elementHandler: IElementHandler) {
  }

  data$: Observable<ITransformData> = this.elementHandler.moveOnWrap$.pipe(
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
