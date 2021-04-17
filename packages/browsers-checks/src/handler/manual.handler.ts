import {Observable, shareReplay} from '@do-while-for-each/rxjs'
import {DownEvent, IMoveEvent, MoveEvent, TManualEvent, UpEvent} from './event'
import {RectHandler} from './rect.handler'

export class ManualHandler {

  down$: Observable<TManualEvent>
  move$: Observable<IMoveEvent>
  up$: Observable<TManualEvent>

  constructor(private element: Element,
              private rectHandler: RectHandler) {
    this.down$ = DownEvent.of$(element).pipe(shareReplay(1))
    this.move$ = MoveEvent.of$(rectHandler, element).pipe(shareReplay(1))
    this.up$ = UpEvent.of$(element).pipe(shareReplay(1))
  }

}
