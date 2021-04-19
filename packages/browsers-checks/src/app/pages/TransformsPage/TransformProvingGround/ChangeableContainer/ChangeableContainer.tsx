import {animationFrame, delay, startWith, tap} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import React, {useEffect, useRef} from 'react'
import {Interactive} from '../../../../../interactive'
import './ChangeableContainer.css'

export function ChangeableContainer({elementWrap}: IProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interactive = new Interactive(ref.current as HTMLDivElement, elementWrap)
    interactive.matrixResult$().pipe(
      startWith(WebMatrix.of()),
      delay(0, animationFrame),
      tap(m => {
        (ref.current as HTMLDivElement).style.transform = m.toStyleValue()
      })
    ).subscribe()
    return () => interactive.stop()
  }, [])

  return (
    <div className="ChangeableContainer" ref={ref}>

    </div>
  );
}

interface IProps {
  elementWrap: Element;
}
