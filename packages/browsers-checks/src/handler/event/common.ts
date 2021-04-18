import {Point} from '@do-while-for-each/math'
import {IMoveEvent, IUnpackedEvent, TManualEvent} from '../contract'
import {RectHandler} from '../rect.handler'

export const processMoveEvent = (prevEvent: IUnpackedEvent, currEvent: IUnpackedEvent): IMoveEvent => ({
  pagePointDiff: Point.diff(currEvent.pagePoint, prevEvent.pagePoint),
  prevEvent,
  currEvent,
})

export class Prepare {

  static event = (event: TManualEvent, pageX: number, pageY: number, rectHandler: RectHandler): IUnpackedEvent => ({
    pagePoint: rectHandler.pagePoint(pageX, pageY),
    event,
  })

  static mouseEvent = (event: MouseEvent, rectHandler: RectHandler): IUnpackedEvent =>
    Prepare.event(event, event.pageX, event.pageY, rectHandler)

  static touchEvent = (event: TouchEvent, rectHandler: RectHandler): IUnpackedEvent => {
    const touch = event.touches[0]
    return Prepare.event(event, touch.pageX, touch.pageY, rectHandler)
  }

}
