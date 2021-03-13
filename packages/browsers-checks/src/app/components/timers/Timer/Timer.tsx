import React, {useEffect} from 'react'
import {useStateObs} from '../../../../hooks/useStateObs'
import {TimerInput} from '../TimerInput/TimerInput'
import {TimerFactory} from '../TimerFactory'

export function Timer() {
  const [count, setCount, count$] = useStateObs('1')
  const [interval, setInterval, interval$] = useStateObs('0.3')

  useEffect(() =>
      TimerFactory.forEffect(count$, interval$)
    , [count$, interval$])

  return (
    <div>
      <h3>Timers</h3>
      <TimerInput label="count" value={count} setValue={setCount}/>&nbsp;&nbsp;&nbsp;
      <TimerInput label="interval" value={interval} setValue={setInterval}/>
    </div>
  )
}
