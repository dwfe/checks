import {animationFrame, delay, map, scan, startWith, tap} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import React, {useEffect, useRef} from 'react'
import {ManualHandler, RectHandler} from '../../../../../handler'
import './ChangeableContainer.css'

export function ChangeableContainer(props: IProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const manualHandler = new ManualHandler(ref.current as HTMLDivElement, props.rectHandler)
    manualHandler.drag$.pipe(
      map(drag => WebMatrix.of().translate(drag.diff.x, drag.diff.y)),
      scan((acc, curr) => acc.multiply(curr)),
      delay(0, animationFrame),
      startWith(WebMatrix.of()),
      tap(m => {
        (ref.current as HTMLDivElement).style.transform = m.toStyleValue()
      })
    ).subscribe()
    return () => manualHandler.stop()
  }, [])

  return (
    <div className="ChangeableContainer" ref={ref}>

    </div>
  );
}

interface IProps {
  rectHandler: RectHandler;
}
