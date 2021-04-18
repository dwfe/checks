import {Observable, shareReplay, Subject, takeUntil} from '@do-while-for-each/rxjs'
import {DragEvent} from './event/composite/drag.event'
import {IDragEvent, IUnpackedEvent} from './contract'
import {RectHandler} from './rect.handler'
import {DownEvent} from './event'

export class ElementHandler {

  down$: Observable<IUnpackedEvent>
  drag$: Observable<IDragEvent>

  private stopper$: Observable<any>
  private stopper = new Subject()

  constructor(private elementWrap: Element,
              private element: Element,
              private rectHandler: RectHandler) {
    this.stopper$ = this.stopper.asObservable().pipe(shareReplay(0));
    this.down$ = DownEvent.of$(element, rectHandler).pipe(
      takeUntil(this.stopper$),
      shareReplay(0)
    )
    this.drag$ = DragEvent.of$(this.down$, rectHandler, elementWrap).pipe(
      takeUntil(this.stopper$),
      shareReplay(0),
    )
  }

  stop(): void {
    this.stopper.next(true)
    this.stopper.complete()
  }

}
