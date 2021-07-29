import {animationFrame, delay, tap} from '@do-while-for-each/rxjs'
import React, {useEffect, useState} from 'react'
import {MouseMove, RectHandler} from '../../../../../interactive'
import s from './EventInfo.module.css'

export function EventInfo({element, rectHandler}: IProps) {
  const [client, setClient] = useState<number[]>([])
  const [page, setPage] = useState<number[]>([])
  const [pos, setPos] = useState<number[]>([])

  useEffect(() => {
    const subscription = MouseMove.event$(element, {passive: true}).pipe(
      delay(0, animationFrame),
      tap(event => {
        setClient([event.clientX, event.clientY])
        setPage([event.pageX, event.pageY])
        setPos(rectHandler.pagePointFromEvent(event))
      })
    ).subscribe()
    return () => subscription.unsubscribe();
  }, [element, rectHandler])

  return (
    <div className={s.container}>
      <table className={s.table}>
        <tbody>
        <tr>
          <td className={s.title}>client</td>
          <td className={s.value}>{client[0]}</td>
          <td className={s.value}>{client[1]}</td>
        </tr>
        <tr>
          <td className={s.title}>page</td>
          <td className={s.value}>{page[0]}</td>
          <td className={s.value}>{page[1]}</td>
        </tr>
        <tr>
          <td className={s.title}>pos</td>
          <td className={s.value}>{pos[0]}</td>
          <td className={s.value}>{pos[1]}</td>
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
