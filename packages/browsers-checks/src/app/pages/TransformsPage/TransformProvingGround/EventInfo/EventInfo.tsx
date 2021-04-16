import React, {useEffect, useState} from 'react'
import {animationFrame, debounceTime, tap} from '@do-while-for-each/rxjs'
import {MouseMove} from '../../../../../handler'
import './EventInfo.css'

export function EventInfo({element}: IProps) {
  const [client, setClient] = useState([] as number[])
  const [offset, setOffset] = useState([] as number[])
  const [page, setPage] = useState([] as number[])

  useEffect(() => {
    const subscription = MouseMove.of$(element).pipe(
      debounceTime(0, animationFrame),
      tap(event => {
        setClient([event.clientX, event.clientY])
        setOffset([event.offsetX, event.offsetY])
        setPage([event.pageX, event.pageY])
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
          <td className="EventInfo_title">offset</td>
          <td className="EventInfo_value">{offset[0]}</td>
          <td className="EventInfo_value">{offset[1]}</td>
        </tr>
        <tr>
          <td className="EventInfo_title">page</td>
          <td className="EventInfo_value">{page[0]}</td>
          <td className="EventInfo_value">{page[1]}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

interface IProps {
  element: Element;
}
