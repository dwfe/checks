import {map, Observable} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {InteractiveVariant, ITransformData, ITransformGenerator} from '../contract'
import {ElementHotHandler} from '../element.hot-handler'

export class DragTransform implements ITransformGenerator {

  constructor(private elementHandler: ElementHotHandler) {
  }

  data$: Observable<ITransformData> = this.elementHandler.drag$.pipe(
    map(drag => ({
      type: InteractiveVariant.DRAG,
      matrix: WebMatrix.of().translate(drag.pagePointDiff.dX, drag.pagePointDiff.dY),
      target: drag.target,
      event: drag.currEvent,
    })),
  )

}
