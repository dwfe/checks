import React, {useRef} from 'react'
import './TransformPolygon.css'
import {InnerRectangle} from './InnerRectangle/InnerRectangle'

export function TransformPolygon() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className="TransformPolygon"
         ref={ref}>
      <InnerRectangle/>
    </div>
  );
}
