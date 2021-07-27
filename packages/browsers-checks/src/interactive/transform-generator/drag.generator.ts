import {map, Observable} from '@do-while-for-each/rxjs'
import {TWebMatrix} from '@do-while-for-each/math'
import {IDragEvent, ITransformGenerator} from '../contract'

export class DragGenerator implements ITransformGenerator {

  constructor(private drag$: Observable<IDragEvent>) {
  }

  data$: Observable<TWebMatrix> = this.drag$.pipe(
    map(drag => ([1, 0, 0, 1, drag.pagePointDiff[0], drag.pagePointDiff[1]])),
  )

}
