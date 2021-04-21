import {map, Observable} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {InteractiveType, ITransformData, ITransformGenerator} from '../contract'
import {ElementHandler} from '../element.handler'

export class DragTransform implements ITransformGenerator {

  constructor(private elementHandler: ElementHandler) {
  }

  data$: Observable<ITransformData> = this.elementHandler.drag$.pipe(
    map(drag => ({
      type: InteractiveType.DRAG,
      matrix: WebMatrix.of().translate(drag.pagePointDiff.dX, drag.pagePointDiff.dY),
      target: drag.target,
      event: drag.currEvent,
    })),
  )

}
