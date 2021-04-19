import {map, Observable, shareReplay} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {IGenerator, IGeneratorAction, IMoveEvent} from '../contract'

export class DragGenerator implements IGenerator {

  constructor(private drag$: Observable<IMoveEvent>) {
  }

  actions: Observable<IGeneratorAction> = this.drag$.pipe(
    map(drag => ({
      matrix: WebMatrix.of().translate(drag.pagePointDiff.dX, drag.pagePointDiff.dY),
      target: drag.target,
      event: drag.currEvent,
    })),
    shareReplay(0),
  )

}