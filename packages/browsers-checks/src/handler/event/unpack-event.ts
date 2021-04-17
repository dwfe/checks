import {IUnpackedEvent, TManualEvent} from './contract'
import {RectHandler} from '../rect.handler'

export class Unpack {

  static event = (event: TManualEvent, pageX: number, pageY: number, rectHandler: RectHandler): IUnpackedEvent => ({
    pagePoint: rectHandler.getPagePoint(pageX, pageY),
    event,
  })

  static mouseEvent = (event: MouseEvent, rectHandler: RectHandler): IUnpackedEvent =>
    Unpack.event(event, event.pageX, event.pageY, rectHandler)

  static touchEvent = (event: TouchEvent, rectHandler: RectHandler): IUnpackedEvent => {
    const touch = event.touches[0]
    return Unpack.event(event, touch.pageX, touch.pageY, rectHandler)
  }

}
