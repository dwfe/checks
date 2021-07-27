import {animationFrame, delay, startWith, tap} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import React, {useEffect, useRef} from 'react'
import {ElementHandler, Interactive, WrapHandler} from '../../../../../interactive'
import './ChangeableContainer.css'

export function ChangeableContainer({elementWrap}: IProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapHandler = new WrapHandler(elementWrap)
    const elementHandler = new ElementHandler(ref.current as HTMLDivElement, wrapHandler)
    const interactive = new Interactive(wrapHandler, elementHandler)
    interactive.resultMatrix$.pipe(
      startWith(WebMatrix.identity()),
      delay(0, animationFrame),
      tap(m => {
        (ref.current as HTMLDivElement).style.transform = WebMatrix.toStyleValue(m)
      })
    ).subscribe()
    return () => {
      wrapHandler.stop()
      elementHandler.stop()
    }
  }, [elementWrap])

  return (
    <div className="ChangeableContainer" ref={ref}>

    </div>
  );
}

interface IProps {
  elementWrap: Element;
}
