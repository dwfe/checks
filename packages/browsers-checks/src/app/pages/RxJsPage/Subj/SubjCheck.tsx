import {finalize, multicast, refCount, ReplaySubject, Subj, tap} from '@do-while-for-each/rxjs'
import {isNumeric} from '@do-while-for-each/common'
import React, {useState} from 'react'
import './SubjCheck.css'
import {Check1} from '../check/check1'

type TCheckVariant = 'v1' | 'v2'

export function SubjCheck() {
  let intervalId
  const [checkVariant, setCheckVariant] = useState<TCheckVariant>('v1')
  const [bufferSize, setBufferSize] = useState(0)

  const sameObs = () => {
    console.log(`-= same Observable =-`,)
    const subj = new Subj({type: 'no-share'});
    // subj.isDebug = true
    new Check1(subj.subj, subj.value$, subj.value$, subj.value$)[checkVariant]()
  }

  const sameObsWithShare = () => {
    console.log(`-= same Observable + share() =-`,)
    const subj = new Subj({type: 'share'});
    // subj.isDebug = true
    new Check1(subj.subj, subj.value$, subj.value$, subj.value$)[checkVariant]()
  }

  const sameObsWithShareReplayRcFalse = () => {
    console.log(`-= same Observable + shareReplay({refCount: false, bufferSize: ${bufferSize}) =-`,)
    const subj = new Subj({type: 'shareReplay', bufferSize});
    // subj.isDebug = true
    new Check1(subj.subj, subj.value$, subj.value$, subj.value$)[checkVariant]()
  }

  const sameObsWithShareReplayRcTrue = () => {
    console.log(`-= same Observable + shareReplay({refCount: true, bufferSize: ${bufferSize}}) =-`,)
    const subj = new Subj({type: 'shareReplay + refCount', bufferSize});
    // subj.isDebug = true
    new Check1(subj.subj, subj.value$, subj.value$, subj.value$)[checkVariant]()
  }

  const sameObsWithMulticastReplay = () => {
    console.log(`-= same Observable + multicast(new ReplaySubject(${bufferSize})), refCount =-`,)
    const subj = new Subj({type: 'no-share'});
    // subj.isDebug = true
    const ob$ = subj.value$.pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,)),
      multicast(new ReplaySubject(bufferSize)),
      refCount(),
    )
    new Check1(subj.subj, ob$, ob$, ob$)[checkVariant]()
  }

  const uniqObs = () => {
    console.log(`-= uniq Observable =-`,)
    const subj = new Subj({type: 'no-share'});
    // subj.isDebug = true
    const ob$ = () => subj.getValue$({type: 'no-share'}).pipe(
      finalize(() => console.log(`obs final`,))
    )
    new Check1(subj.subj, ob$(), ob$(), ob$())[checkVariant]()
  }

  const uniqObsWithShare = () => {
    console.log(`-= uniq Observable + share() =-`,)
    const subj = new Subj({type: 'share'});
    // subj.isDebug = true
    const ob$ = () => subj.getValue$({type: 'share'}).pipe(
      finalize(() => console.log(`obs final`,)),
    )
    new Check1(subj.subj, ob$(), ob$(), ob$())[checkVariant]()
  }

  const uniqObsWithShareReplay = () => {
    console.log(`-= uniq Observable + shareReplay(${bufferSize}) =-`,)
    const subj = new Subj({type: 'shareReplay', bufferSize});
    // subj.isDebug = true
    const ob$ = () => subj.getValue$({type: 'shareReplay', bufferSize}).pipe(
      finalize(() => console.log(`obs final`,)),
    )
    new Check1(subj.subj, ob$(), ob$(), ob$())[checkVariant]()
  }

  const uniqSubj = () => {
    console.log(`-= uniq Subject =-`,)
    const subj = new Subj({type: 'no-share'});
    // subj.isDebug = true
    const ob$ = () => subj.subj.pipe(
      tap(data => console.log(`obs emit`, data)),
    )
    new Check1(subj.subj, ob$(), ob$(), ob$())[checkVariant]()
  }

  const changeCheckVariant = (value: TCheckVariant) => setCheckVariant(value)
  const changeBufferSize = (value: string) => {
    if (isNumeric(value))
      setBufferSize(+value)
  }

  return (
    <div className="SubjCheck">
      <h3>Subj check</h3>
      <select onChange={event => changeCheckVariant(event.target.value as TCheckVariant)}>
        <option value="v1">subscribe ob1, ob2 NEXT unsubscribe ob1, ob2</option>
        <option value="v2">subscribe ob1, ob2 NEXT unsubscribe ob2, subscribe ob3</option>
      </select>
      <label>
        bufferSize:&nbsp;
        <input value={bufferSize} onChange={event => changeBufferSize(event.target.value)}/>
      </label>
      <button onClick={sameObs}>same Observable</button>
      <button onClick={sameObsWithShare}>same Observable + share()</button>
      <button onClick={sameObsWithShareReplayRcFalse}>same Observable + shareReplay(refCount: false, bufferSize: {bufferSize})</button>
      <button onClick={sameObsWithShareReplayRcTrue}>same Observable + shareReplay(refCount: true, bufferSize: {bufferSize})</button>
      <button onClick={sameObsWithMulticastReplay}>same Observable + multicast(new ReplaySubject({bufferSize})), refCount</button>
      <button onClick={uniqObs}>uniq Observable</button>
      <button onClick={uniqObsWithShare}>uniq Observable + share()</button>
      <button onClick={uniqObsWithShareReplay}>uniq Observable + shareReplay({bufferSize})</button>
      <button onClick={uniqSubj}>uniq Subject</button>
    </div>
  )
}
