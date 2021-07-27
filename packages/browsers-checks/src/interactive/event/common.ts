import {IPagePointEvent, TManualEvent} from '../contract'
import {RectHandler} from '../handler'

export function toPagePointEvent(event: TManualEvent, rectHandler: RectHandler): IPagePointEvent {
  let pageX: number, pageY: number;
  if (event['pageX'] !== undefined) {
    pageX = (event as MouseEvent).pageX
    pageY = (event as MouseEvent).pageY
  } else if (event['touches'] !== undefined) {
    pageX = (event as TouchEvent).touches[0].pageX
    pageY = (event as TouchEvent).touches[0].pageY
  } else
    throw new Error(`can't convert to IPagePointEvent because unknown type of event`)
  return {
    pagePoint: rectHandler.pagePoint(pageX, pageY),
    target: event.target,
    event,
  };
}
