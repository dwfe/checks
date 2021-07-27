import {animationFrame, debounceTime, delay, startWith, tap} from '@do-while-for-each/rxjs'
import React, {useEffect, useRef, useState} from 'react'
import {WebMatrix} from '@do-while-for-each/math'
import {ElementHandler, Interactive, WrapHandler} from '../../../../../interactive'
import './ChangeableContainer.css'

const inactiveText = 'Transform Me'

export function ChangeableContainer({elementWrap}: IProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [text, setText] = useState(inactiveText)

  useEffect(() => {
    const element = ref.current as HTMLDivElement;

    const wrapHandler = new WrapHandler(elementWrap)
    const elementHandler = new ElementHandler(element, wrapHandler)
    const interactive = new Interactive(wrapHandler, elementHandler)

    interactive.resultMatrix$.pipe(
      startWith(WebMatrix.identity()),
      delay(0, animationFrame),
      tap(m => element.style.transform = WebMatrix.toStyleValue(m))
    ).subscribe()

    interactive.resultMatrix$.pipe(
      tap(() => setText('Yeah!')),
      debounceTime(500),
      tap(() => setText(inactiveText)),
    ).subscribe()

    return () => {
      wrapHandler.stop()
      elementHandler.stop()
    }
  }, [elementWrap])

  return (
    <div className="ChangeableContainer" ref={ref}>
      <div>{text}</div>
    </div>
  );
}

interface IProps {
  elementWrap: Element;
}
