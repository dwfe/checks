import {animationFrame, delay, startWith, tap} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import React, {useEffect, useRef} from 'react'
import {ElementHandler, Interactive, InteractiveVariant, WrapHandler} from '../../../../../interactive'
import './ChangeableContainer.css'

const {DRAG,} = InteractiveVariant

export function ChangeableContainer({elementWrap}: IProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapHandler = new WrapHandler(elementWrap)
    const elementHandler = new ElementHandler(ref.current as HTMLDivElement, wrapHandler)
    const interactive = new Interactive(wrapHandler, elementHandler, [DRAG,])
    interactive.matrixResult$.pipe(
      startWith(WebMatrix.of()),
      delay(0, animationFrame),
      tap(m => {
        (ref.current as HTMLDivElement).style.transform = m.toStyleValue()
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
