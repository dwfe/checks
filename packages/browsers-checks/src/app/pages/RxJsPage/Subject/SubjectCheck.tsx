import {finalize, multicast, refCount, ReplaySubject, share, shareReplay, Subject, tap} from '@do-while-for-each/rxjs'
import {isNumeric} from '@do-while-for-each/common'
import React, {useState} from 'react'
import {Check1} from '../check/check1'
import './SubjectCheck.css'

type TCheckVariant = 'v1' | 'v2'

export function SubjectCheck() {
  const [checkVariant, setCheckVariant] = useState<TCheckVariant>('v1')
  const [bufferSize, setBufferSize] = useState(0)

  const sameObs = () => {
    console.log(`-= same Observable =-`,)
    const subj = new Subject();
    const ob$ = subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,))
    )
    new Check1(subj, ob$, ob$, ob$)[checkVariant]()
  }

  const sameObsWithShare = () => {
    console.log(`-= same Observable + share() =-`,)
    const subj = new Subject();
    const ob$ = subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,)),
      share(),
    )
    new Check1(subj, ob$, ob$, ob$)[checkVariant]()
  }

  const sameObsWithShareReplayRcFalse = () => {
    console.log(`-= same Observable + shareReplay({refCount: false, bufferSize: ${bufferSize}) =-`,)
    const subj = new Subject();
    const ob$ = subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,)),
      shareReplay({refCount: false, bufferSize}),
    )
    new Check1(subj, ob$, ob$, ob$)[checkVariant]()
  }

  const sameObsWithShareReplayRcTrue = () => {
    console.log(`-= same Observable + shareReplay({refCount: true, bufferSize: ${bufferSize}}) =-`,)
    const subj = new Subject();
    const ob$ = subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,)),
      shareReplay({refCount: true, bufferSize}),
    )
    new Check1(subj, ob$, ob$, ob$)[checkVariant]()
  }

  const sameObsWithMulticastReplay = () => {
    console.log(`-= same Observable + multicast(new ReplaySubject(${bufferSize})), refCount =-`,)
    const subj = new Subject();
    const ob$ = subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,)),
      multicast(new ReplaySubject(bufferSize)),
      refCount(),
    )
    new Check1(subj, ob$, ob$, ob$)[checkVariant]()
  }

  const uniqObs = () => {
    console.log(`-= uniq Observable =-`,)
    const subj = new Subject();
    const ob$ = () => subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,))
    )
    new Check1(subj, ob$(), ob$(), ob$())[checkVariant]()
  }

  const uniqObsWithShare = () => {
    console.log(`-= uniq Observable + share() =-`,)
    const subj = new Subject();
    const ob$ = () => subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,)),
      share(),
    )
    new Check1(subj, ob$(), ob$(), ob$())[checkVariant]()
  }

  const uniqObsWithShareReplay = () => {
    console.log(`-= uniq Observable + shareReplay(${bufferSize}) =-`,)
    const subj = new Subject();
    const ob$ = () => subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,)),
      shareReplay(bufferSize),
    )
    new Check1(subj, ob$(), ob$(), ob$())[checkVariant]()
  }

  const uniqSubj = () => {
    console.log(`-= uniq Subject =-`,)
    const subj = new Subject();
    const ob$ = () => subj.pipe(
      tap(data => console.log(`obs emit`, data)),
    )
    new Check1(subj, ob$(), ob$(), ob$())[checkVariant]()
  }

  const changeCheckVariant = (value: TCheckVariant) => setCheckVariant(value)
  const changeBufferSize = (value: string) => {
    if (isNumeric(value))
      setBufferSize(+value)
  }

  return (
    <div className="SubjectCheck">
      <h3>Subject check</h3>
      <select onChange={event => changeCheckVariant(event.target.value as TCheckVariant)}>
        <option value="v1">subscribe ob1, ob2 NEXT unsubscribe ob1, ob2</option>
        <option value="v2">subscribe ob1, ob2 NEXT unsubscribe ob2, subscribe ob3</option>
        <option value="v3">subscribe ob1, ob2 NEXT unsubscribe ob1, ob2 NEXT subscribe ob3</option>
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
