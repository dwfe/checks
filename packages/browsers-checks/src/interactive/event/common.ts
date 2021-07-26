import {IUnpackedEvent, TManualEvent} from '../contract'
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
