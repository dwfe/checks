import {Point} from '@do-while-for-each/math'
import {IMoveEvent, IUnpackedEvent, TManualEvent} from '../contract'
import {RectHandler} from '../handler'

export const unpackEvent = (type: 'mouse' | 'touch',
                            event: TManualEvent,
                            rectHandler: RectHandler,
                            addExtraInfo = false): IUnpackedEvent => {
  let pageX: number, pageY: number;
  switch (type) {
    case 'mouse':
      pageX = (event as MouseEvent).pageX
      pageY = (event as MouseEvent).pageY
      break
    case 'touch':
      const touch = (event as TouchEvent).touches[0]
      pageX = touch.pageX
      pageY = touch.pageY
      break
  }
  const result: IUnpackedEvent = {
    pagePoint: rectHandler.pagePoint(pageX, pageY),
  }
  if (addExtraInfo)
    result.extra = {
      target: event.target,
      event,
    }
  return result;
}

export const processMoveEvent = (prevEvent: IUnpackedEvent,
                                 currEvent: IUnpackedEvent): IMoveEvent => {
  const result: IMoveEvent = {
    pagePointDiff: Point.subtract(currEvent.pagePoint, prevEvent.pagePoint),
  };
  if (currEvent.extra)
    result.extra = {
      target: currEvent.extra.target,
      prevEvent,
      currEvent,
    }
  return result;
}


/**
 * Sets up a browser's event listener.
 * @return unlisten - A function that may be used to stop listening
 */
export const addListener = (type: string,
                            element: Element,
                            fn: EventListenerOrEventListenerObject,
                            options?: boolean | AddEventListenerOptions
): () => void => {
  element.addEventListener(type, fn, options)
  return () => element.removeEventListener(type, fn, options)
}
