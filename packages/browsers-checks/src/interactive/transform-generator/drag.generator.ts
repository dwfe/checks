import {map, Observable} from '@do-while-for-each/rxjs'
import {TWebMatrix} from '@do-while-for-each/math'
import {ITransformGenerator} from '../contract'
import {ElementHandler} from '../handler'

export class DragGenerator implements ITransformGenerator {

  constructor(private handler: ElementHandler) {
  }

  data$: Observable<TWebMatrix> = this.handler.drag$.pipe(
    map(drag => ([1, 0, 0, 1, drag.pagePointDiff[0], drag.pagePointDiff[1]])),
  )

}
