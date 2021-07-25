import {map, Observable} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {InteractiveVariant, ITransformData, ITransformGenerator} from '../contract'
import {ElementHandler} from '../handler'

export class DragTransform implements ITransformGenerator {

  identityMatrix = WebMatrix.identity();

  constructor(private handler: ElementHandler) {
  }

  data$: Observable<ITransformData> = this.handler.drag$.pipe(
    map(drag => ({
      variant: InteractiveVariant.DRAG,
      matrix: WebMatrix.translateIdentity(drag.pagePointDiff[0], drag.pagePointDiff[1]),
      target: drag.target,
      event: drag.currEvent,
    })),
  )

}
