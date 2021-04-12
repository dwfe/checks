import React from 'react'
import {InnerRectangle} from './InnerRectangle/InnerRectangle'
import {useResizeObserver} from '../../../../handlers'
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
