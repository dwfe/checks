import {debounceTime, tap} from '@do-while-for-each/rxjs'
import React, {useEffect} from 'react'
import {useResizeObserver} from '../../../../interactive'
import './ResizeObserver.css'

export function ResizeObserver() {
  const [rectElemRef, rectHandler] = useResizeObserver<HTMLDivElement>()

  useEffect(() => {
    const subscr1 = rectHandler.rect$.subscribe(data => console.log(`rect-1`, data))
    const subscr2 = rectHandler.rect$.subscribe(data => console.log(`rect-2`, data))
    rectHandler.rect$.pipe(
      debounceTime(1000),
      tap(data => console.log(`=`, data)),
    ).subscribe();
    setTimeout(() => {
      subscr1.unsubscribe()
      subscr2.unsubscribe()
    }, 10_000)
  }, [rectHandler])

  return (
    <div className="ResizeObserver"
         ref={rectElemRef}>
      Rectangle
    </div>
  );
}
