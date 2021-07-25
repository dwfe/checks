import {animationFrame, delay, tap} from '@do-while-for-each/rxjs'
import React, {useEffect, useState} from 'react'
import {MouseMove, RectHandler} from '../../../../../interactive'
import './EventInfo.css'

export function EventInfo({element, rectHandler}: IProps) {
  const [client, setClient] = useState([] as number[])
  const [page, setPage] = useState([] as number[])
  const [pos, setPos] = useState([] as number[])

  useEffect(() => {
    const subscription = MouseMove.event$(element, {passive: true}).pipe(
      delay(0, animationFrame),
      tap(event => {
        setClient([event.clientX, event.clientY])
        setPage([event.pageX, event.pageY])
        setPos(rectHandler.pagePoint(event.pageX, event.pageY))
      })
    ).subscribe()
    return () => subscription.unsubscribe();
  }, [])

  return (
    <div className="EventInfo">
      <table className="EventInfo_table">
        <tbody>
        <tr>
          <td className="EventInfo_title">client</td>
          <td className="EventInfo_value">{client[0]}</td>
          <td className="EventInfo_value">{client[1]}</td>
        </tr>
        <tr>
          <td className="EventInfo_title">page</td>
          <td className="EventInfo_value">{page[0]}</td>
          <td className="EventInfo_value">{page[1]}</td>
        </tr>
        <tr>
          <td className="EventInfo_title">pos</td>
          <td className="EventInfo_value">{pos[0]}</td>
          <td className="EventInfo_value">{pos[1]}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

interface IProps {
  element: Element;
  rectHandler: RectHandler;
}
