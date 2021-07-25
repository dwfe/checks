import {map, Observable} from '@do-while-for-each/rxjs'
import {InteractiveVariant, ITransformData, ITransformGenerator} from '../contract'
import {ElementHandler} from '../handler'

export class DragTransform implements ITransformGenerator {

  constructor(private handler: ElementHandler) {
  }

  data$: Observable<ITransformData> = this.handler.drag$.pipe(
    map(drag => {
      const result: ITransformData = {
        matrix: [1, 0, 0, 1, drag.pagePointDiff[0], drag.pagePointDiff[1]],
      }
      if (drag.extra)
        result.extra = {
          variant: InteractiveVariant.DRAG,
          target: drag.extra.target,
          event: drag.extra.currEvent,
        }
      return result;
    }),
  )

}
