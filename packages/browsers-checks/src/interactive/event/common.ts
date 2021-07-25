import {Point} from '@do-while-for-each/math'
import {IMoveEvent, IUnpackedEvent, TManualEvent} from '../contract'
import {RectHandler} from '../handler'

export const processMoveEvent = (prevEvent: IUnpackedEvent, currEvent: IUnpackedEvent): IMoveEvent => ({
  pagePointDiff: Point.subtract(currEvent.pagePoint, prevEvent.pagePoint),
  target: currEvent.target,
  prevEvent,
  currEvent,
})

export class Prepare {

  static event = (event: TManualEvent, pageX: number, pageY: number, rectHandler: RectHandler): IUnpackedEvent => ({
    pagePoint: rectHandler.pagePoint(pageX, pageY),
    target: event.target,
    event,
  })

  static mouseEvent = (event: MouseEvent, rectHandler: RectHandler): IUnpackedEvent =>
    Prepare.event(event, event.pageX, event.pageY, rectHandler)

  static touchEvent = (event: TouchEvent, rectHandler: RectHandler): IUnpackedEvent => {
    const touch = event.touches[0]
    return Prepare.event(event, touch.pageX, touch.pageY, rectHandler)
  }

}

/**
 * Sets up a browser's event listener.
 * @return unlisten - A function that may be used to stop listening
 */
export const addListener = (type: string, element: Element, fn: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): () => void => {
  element.addEventListener(type, fn, options)
  return () => element.removeEventListener(type, fn, options)
}
