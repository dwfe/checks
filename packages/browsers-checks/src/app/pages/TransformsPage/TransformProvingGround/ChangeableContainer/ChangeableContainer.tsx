import {animationFrame, debounceTime, delay, startWith, tap} from '@do-while-for-each/rxjs'
import React, {useEffect, useRef, useState} from 'react'
import {WebMatrix} from '@do-while-for-each/math'
import {ElementHandler, ElementInteractive, WrapHandler} from '../../../../../interactive'
import './ChangeableContainer.css'

const textInactive = 'Transform Me'

export function ChangeableContainer({wrapHandler}: IProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [text, setText] = useState(textInactive)

  useEffect(() => {
    const element = ref.current as HTMLDivElement;

    const handler = new ElementHandler(element, wrapHandler)
    const interactive = new ElementInteractive(
      handler,
      WebMatrix.of().translate(50, 120).rotate(-10).toJSON()
    )

    interactive.resultMatrix$.pipe(
      startWith(WebMatrix.identity()),
      delay(0, animationFrame),
      tap(m => element.style.transform = WebMatrix.toStyleValue(m))
    ).subscribe()

    interactive.resultMatrix$.pipe(
      tap(() => setText('Yeah!')),
      debounceTime(500),
      tap(() => setText(textInactive)),
    ).subscribe()

    return () => {
      handler.stop()
      interactive.stop()
    }
  }, [wrapHandler])

  return (
    <div className="ChangeableContainer" ref={ref}>
      <div>{text}</div>
    </div>
  );
}

interface IProps {
  wrapHandler: WrapHandler;
}
