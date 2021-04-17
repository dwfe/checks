import {Observable, shareReplay, switchMap, takeUntil} from '@do-while-for-each/rxjs'
import {DownEvent, IUnpackedEvent, MoveEvent, UpEvent} from './event'
import {RectHandler} from './rect.handler'

export class ManualHandler {

  down$: Observable<IUnpackedEvent>
  move$: Observable<IUnpackedEvent>
  drag$: Observable<any>

  constructor(private element: Element,
              private rectHandler: RectHandler) {
    this.down$ = DownEvent.of$(element, rectHandler).pipe(shareReplay(1))
    this.move$ = MoveEvent.of$(element, rectHandler, {passive: true}).pipe(shareReplay(1))
    this.drag$ = this.down$.pipe(
      switchMap(x => this.move$.pipe(
        takeUntil(UpEvent.of$(element, rectHandler, {once: true}))
      )),
    )
  }

}
