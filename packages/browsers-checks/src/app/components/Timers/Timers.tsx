import React, {useEffect} from 'react'
import classNames from 'classnames'
import {useSubjState} from '../../../hooks/useSubjState'
import './styles.css'
import {invalidClass, isCountValidFn, isIntervalValidFn} from './globals';
import {TimerFactory} from './TimerFactory';


export const Timers = () => {
  const [count, count$, setCount] = useSubjState('1')
  const countInvalidClass = invalidClass(count, isCountValidFn)

  const [interval, interval$, setInterval] = useSubjState('0.3')
  const intervalInvalidClass = invalidClass(interval, isIntervalValidFn)

  useEffect(() => {
    const timerFactory = new TimerFactory(count$, interval$)
    timerFactory.start()
    return () => {
      timerFactory.stop()
    }
  }, [count$, interval$])

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
