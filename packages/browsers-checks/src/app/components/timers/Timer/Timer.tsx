import {useSubjectedState} from '@do-while-for-each/react'
import React, {useEffect} from 'react'
import {TimerInput} from '../TimerInput/TimerInput'
import {TimerFactory} from '../TimerFactory'

export function Timer() {
  const [count, setCount] = useSubjectedState('1')
  const [interval, setInterval] = useSubjectedState('0.3')

  useEffect(() =>
      TimerFactory.forEffect(count.value$, interval.value$)
    , [count, interval])

  return (
    <div>
      <h3>Timers</h3>
      <TimerInput label="count" value={count.value} setValue={setCount}/>&nbsp;&nbsp;&nbsp;
      <TimerInput label="interval" value={interval.value} setValue={setInterval}/>
    </div>
  )
}
