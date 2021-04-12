import {debounceTime, tap} from '@do-while-for-each/rxjs'
import React, {useEffect} from 'react'
import {useResizeObserver} from '../../../../handlers/useResizeObserver'
import './ResizeObserver.css'

export function ResizeObserver() {
  const [rectElemRef, rectHandler] = useResizeObserver<HTMLDivElement>()

  useEffect(() => {
    rectHandler.rect$.pipe(
      debounceTime(300),
      tap(data => console.log(`=`, data)),
    ).subscribe();
  }, [rectHandler])

  return (
    <div className="ResizeObserver"
         ref={rectElemRef}>
      Rectangle
    </div>
  );
}
