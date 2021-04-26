import {animationFrame, delay, startWith, tap} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import React, {useEffect, useRef} from 'react'
import {Interactive, InteractiveVariant} from '../../../../../interactive'
import './ChangeableContainer.css'

const {DRAG,} = InteractiveVariant

export function ChangeableContainer({elementWrap}: IProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interactive = new Interactive(ref.current as HTMLDivElement, elementWrap, 'hot', [DRAG,])
    interactive.transformResult$.pipe(
      startWith(WebMatrix.of()),
      delay(0, animationFrame),
      tap(m => {
        (ref.current as HTMLDivElement).style.transform = m.toStyleValue()
      })
    ).subscribe()
    return () => interactive.stop()
  }, [elementWrap])

  return (
    <div className="ChangeableContainer" ref={ref}>

    </div>
  );
}

interface IProps {
  elementWrap: Element;
}
