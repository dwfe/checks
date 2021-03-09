import React, {useEffect} from 'react'
import {invalidClass, isCountValidFn, isIntervalValidFn} from '../common'
import {useSubjState} from '../../../../hooks.utils/useSubjState'
import {TimerInput} from '../TimerInput/TimerInput'
import {TimerFactory} from '../TimerFactory'

export function Timer() {
  const [count, count$, setCount] = useSubjState('1')
  const [interval, interval$, setInterval] = useSubjState('0.3')

  useEffect(() =>
      TimerFactory.forEffect(count$, interval$)
    , [count$, interval$])

  return (
    <div>
      <h3>Timers</h3>
      <TimerInput label="count" value={count} setValue={setCount} invalidClass={invalidClass(count, isCountValidFn)}/>&nbsp;&nbsp;&nbsp;
      <TimerInput label="interval" value={interval} setValue={setInterval} invalidClass={invalidClass(interval, isIntervalValidFn)}/>
    </div>
  )
}
