import {map, Observable} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {InteractiveVariant, ITransformData, ITransformGenerator} from '../contract'
import {ElementHandlerHot} from '../element.handler-hot'

export class ScaleTransform implements ITransformGenerator {

  constructor(private elementHandler: ElementHandlerHot) {
  }

  data$: Observable<ITransformData> = this.elementHandler.moveOnWrap.event$.pipe(
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
