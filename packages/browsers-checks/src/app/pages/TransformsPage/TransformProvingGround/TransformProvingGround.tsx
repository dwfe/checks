import React, {useEffect} from 'react'
import {ChangeableContainer} from './ChangeableContainer/ChangeableContainer'
import {MouseMoveEvent, useResizeObserver} from '../../../../handler'
import './TransformProvingGround.css'

export function TransformProvingGround() {
  const [element, rectHandler] = useResizeObserver<HTMLDivElement>()

  useEffect(() => {
    const subscription = MouseMoveEvent.of(element.current as Element)
      .subscribe(event => {
        console.log(
          `client[${event.clientX}, ${event.clientY}]`,
          `offset[${event.offsetX}, ${event.offsetY}]`,
          `page[${event.pageX}, ${event.pageY}]`)
      })
    return () => subscription.unsubscribe();
  }, [])

  return (
    <div className="TransformProvingGround"
         ref={element}>
      {/*<ChangeableContainer/>*/}
    </div>
  );
}
