import {map, Observable, shareReplay} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {IMoveEvent, InteractiveType, ITransformData, ITransformGenerator} from '../contract'

export class DragTransform implements ITransformGenerator {

  constructor(private drag$: Observable<IMoveEvent>) {
  }

  data$: Observable<ITransformData> = this.drag$.pipe(
    map(drag => ({
      type: InteractiveType.DRAG,
      matrix: WebMatrix.of().translate(drag.pagePointDiff.dX, drag.pagePointDiff.dY),
      target: drag.target,
      event: drag.currEvent,
    })),
    shareReplay(0),
  )

}
