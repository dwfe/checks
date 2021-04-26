import {ElementHandlerType, IElementHandler, IElementHandleWrap} from '../contract'
import {ElementHandlerCold} from './element.handler-cold'
import {ElementHandlerHot} from './element.handler-hot'

export class ElementHandlerFactory {

  static get(type: ElementHandlerType, element: Element, wrap: IElementHandleWrap): IElementHandler {
    switch (type) {
      case 'hot':
        return new ElementHandlerHot(element, {element: wrap.element, rectHandler: wrap.rectHandler})
      case 'cold':
        return new ElementHandlerCold(element, {element: wrap.element, rectHandler: wrap.rectHandler})
      default:
        throw new Error(`unknown ElementHandlerType '${type}'`)
    }
  }

}
