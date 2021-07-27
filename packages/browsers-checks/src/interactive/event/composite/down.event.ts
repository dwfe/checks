import {map, merge, Observable, share} from '@do-while-for-each/rxjs'
import {ISharedHotEventOptions, IUnpackedEvent} from '../../contract'
import {TouchStart} from '../touch/touch-start.event'
import {MouseDown} from '../mouse/mouse-down.event'
import {RectHandler} from '../../handler'
import {unpackEvent} from '../common'

export class DownEvent {

  static event$ = (element: Element,
                   rectHandler: RectHandler,
                   options?: ISharedHotEventOptions): Observable<IUnpackedEvent> =>
    merge(
      MouseDown.event$(element, options?.listener).pipe(
        map(event => unpackEvent('mouse', event, rectHandler, options?.addExtraInfo)),
      ),
      TouchStart.event$(element, options?.listener).pipe(
        map(event => unpackEvent('touch', event, rectHandler, options?.addExtraInfo)),
      ),
    ).pipe(
      share(),
    )

}
