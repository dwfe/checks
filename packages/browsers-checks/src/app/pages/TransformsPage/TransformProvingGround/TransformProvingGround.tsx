import React from 'react'
import {useResizeObserver} from '../../../../handlers/useResizeObserver'
import {InnerRectangle} from './InnerRectangle/InnerRectangle'
import './TransformProvingGround.css'

export function TransformProvingGround() {
  const [rectElemRef, rectHandler] = useResizeObserver<HTMLDivElement>()

  return (
    <div className="TransformProvingGround"
         ref={rectElemRef}>
      <InnerRectangle/>
    </div>
  );
}
