import {MutableRefObject, useEffect, useRef, useState} from 'react'
import {RectHandler} from './rect.handler'

export const useResizeObserver = <TElement extends Element>(): [MutableRefObject<TElement | null>, RectHandler] => {
  const ref = useRef<TElement>(null)
  const [handler] = useState(new RectHandler())

  useEffect(() => {
    handler.init(ref.current as TElement)
    return () => handler.stop()
  }, [handler])

  return [ref, handler]
}
