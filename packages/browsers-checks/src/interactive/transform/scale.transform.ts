import {map, Observable} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {InteractiveType, ITransformData, ITransformGenerator} from '../contract'
import {ElementHandler} from '../element.handler'

export class ScaleTransform implements ITransformGenerator {

  constructor(private elementHandler: ElementHandler) {
  }

  data$: Observable<ITransformData> = this.elementHandler.moveOnWrap.event$.pipe(
    map(move => {
      const matrix = WebMatrix.of()
        .translate(move.pagePoint.x, move.pagePoint.y)
        .invert()
        .scale(1.01)
        .translate(move.pagePoint.x, move.pagePoint.y)
      return {
        type: InteractiveType.SCALE,
        matrix,
        target: move.target,
        event: move,
      }
    })
  )

}
