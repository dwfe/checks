import {map, Observable} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {InteractiveVariant, ITransformData, ITransformGenerator} from '../contract'
import {ElementHandler} from '../handler'

export class DragTransform implements ITransformGenerator {

  constructor(private handler: ElementHandler) {
  }

  data$: Observable<ITransformData> = this.handler.drag$.pipe(
    map(drag => ({
      variant: InteractiveVariant.DRAG,
      matrix: WebMatrix.of().translate(drag.pagePointDiff.dX, drag.pagePointDiff.dY),
      target: drag.target,
      event: drag.currEvent,
    })),
  )

}
