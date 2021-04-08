import {debounceTime, tap} from '@do-while-for-each/rxjs'
import React, {useEffect, useRef} from 'react'
import {RectHandler} from '../../../../handlers/rect.handler'
import './ResizeObserver.css'

export function ResizeObserver() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rectHandler = new RectHandler(ref.current as HTMLDivElement)
    rectHandler.rect$.pipe(
      debounceTime(300),
      tap(data => console.log(`=`, data)),
    ).subscribe();
    return () => rectHandler.stop()
  }, [])

  return (
    <div className="ResizeObserver"
         ref={ref}>
      Rectangle
    </div>
  );
}
