import React, {useEffect, useState} from 'react'
import {useResizeObserver} from '../../../../handler'
import {EventInfo} from './EventInfo/EventInfo'
import './TransformProvingGround.css'

export function TransformProvingGround() {
  const [ref, rectHandler] = useResizeObserver<HTMLDivElement>()
  const [element, setElement] = useState(ref.current)

  useEffect(() => {
    setElement(ref.current)
  }, [])

  return (
    <div className="TransformProvingGround" ref={ref}>
      {element === null ? <></> : <EventInfo element={element}/>}
      {/*<ChangeableContainer/>*/}
    </div>
  );
}
