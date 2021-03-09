import React, {useEffect} from 'react'
import classNames from 'classnames'
import {invalidClass, isCountValidFn, isIntervalValidFn} from './globals'
import {useSubjState} from '../../../hooks.utils/useSubjState'
import {TimerFactory} from './TimerFactory'
import './styles.css'

export function Timers() {
  const [count, count$, setCount] = useSubjState('1')
  const [interval, interval$, setInterval] = useSubjState('0.3')
  const countInvalidClass = invalidClass(count, isCountValidFn)
  const intervalInvalidClass = invalidClass(interval, isIntervalValidFn)

  useEffect(() =>
      TimerFactory.forEffect(count$, interval$)
    , [count$, interval$])

  return (
    <div className="Timers">
      <h3>Timers</h3>
      <label>
        count&nbsp;
        <input type="string"
               className={classNames(countInvalidClass)}
               onChange={event => setCount(event.target.value)}
               value={count}
        />
      </label>&nbsp;&nbsp;&nbsp;
      <label>
        interval&nbsp;
        <input type="string"
               className={classNames(intervalInvalidClass)}
               onChange={event => setInterval(event.target.value)}
               value={interval}
        />&nbsp;seconds
      </label>
    </div>
  )
}
