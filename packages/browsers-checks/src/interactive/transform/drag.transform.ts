import {map, Observable} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {InteractiveVariant, ITransformData, ITransformGenerator} from '../contract'
import {ElementHandlerHot} from '../element.handler-hot'

export class DragTransform implements ITransformGenerator {

  constructor(private elementHandler: ElementHandlerHot) {
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
