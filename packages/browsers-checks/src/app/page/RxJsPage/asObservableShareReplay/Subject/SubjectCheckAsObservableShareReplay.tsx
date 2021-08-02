import {finalize, multicast, refCount, ReplaySubject, share, shareReplay, Subject, tap} from '@do-while-for-each/rxjs'
import {useSubjectedState} from '@do-while-for-each/react'
import React, {useState} from 'react'
import {Check} from '../check/check'
import './SubjectCheckAsObservableShareReplay.css'

export function SubjectCheckAsObservableShareReplay() {
  const [checkVariant, setCheckVariant] = useState<string>('case3')
  const [bufferSize, setBufferSize] = useSubjectedState('0')

  const sameObs = () => {
    console.log(`-= same Observable =-`,)
    const subj = new Subject();
    const ob$ = subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,))
    )
    new Check(subj, ob$, ob$, ob$)[checkVariant]()
  }

  const sameObsWithShare = () => {
    console.log(`-= same Observable + share() =-`,)
    const subj = new Subject();
    const ob$ = subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,)),
      share(),
    )
    new Check(subj, ob$, ob$, ob$)[checkVariant]()
  }

  const sameObsWithShareReplayRcFalse = () => {
    console.log(`-= same Observable + shareReplay({refCount: false, bufferSize: ${bufferSize.lastValue}) =-`,)
    const subj = new Subject();
    const ob$ = subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,)),
      shareReplay({refCount: false, bufferSize: +bufferSize.lastValue}),
    )
    new Check(subj, ob$, ob$, ob$)[checkVariant]()
  }

  const sameObsWithShareReplayRcTrue = () => {
    console.log(`-= same Observable + shareReplay({refCount: true, bufferSize: ${bufferSize.lastValue}}) =-`,)
    const subj = new Subject();
    const ob$ = subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,)),
      shareReplay({refCount: true, bufferSize: +bufferSize.lastValue}),
    )
    new Check(subj, ob$, ob$, ob$)[checkVariant]()
  }

  const sameObsWithMulticastReplay = () => {
    console.log(`-= same Observable + multicast(new ReplaySubject(${bufferSize.lastValue})), refCount =-`,)
    const subj = new Subject();
    const ob$ = subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,)),
      multicast(new ReplaySubject(+bufferSize.lastValue)),
      refCount(),
    )
    new Check(subj, ob$, ob$, ob$)[checkVariant]()
  }

  const uniqObs = () => {
    console.log(`-= uniq Observable =-`,)
    const subj = new Subject();
    const ob$ = () => subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,))
    )
    new Check(subj, ob$(), ob$(), ob$())[checkVariant]()
  }

  const uniqObsWithShare = () => {
    console.log(`-= uniq Observable + share() =-`,)
    const subj = new Subject();
    const ob$ = () => subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,)),
      share(),
    )
    new Check(subj, ob$(), ob$(), ob$())[checkVariant]()
  }

  const uniqObsWithShareReplay = () => {
    console.log(`-= uniq Observable + shareReplay(${bufferSize.lastValue}) =-`,)
    const subj = new Subject();
    const ob$ = () => subj.asObservable().pipe(
      tap(data => console.log(`obs emit`, data)),
      finalize(() => console.log(`obs final`,)),
      shareReplay(+bufferSize.lastValue),
    )
    new Check(subj, ob$(), ob$(), ob$())[checkVariant]()
  }

  const uniqSubj = () => {
    console.log(`-= uniq Subject =-`,)
    const subj = new Subject();
    const ob$ = () => subj.pipe(
      tap(data => console.log(`obs emit`, data)),
    )
    new Check(subj, ob$(), ob$(), ob$())[checkVariant]()
  }

  const changeCheckVariant = (value: string) => setCheckVariant(value)

  return (
    <div className="SubjectCheckAsObservableShareReplay">
      <h3>Subject check</h3>
      <select onChange={event => changeCheckVariant(event.target.value)} value={checkVariant}>
        <option value="case1">subscribe ob1, ob2 NEXT unsubscribe ob1, ob2</option>
        <option value="case2">subscribe ob1, ob2 NEXT unsubscribe ob2, subscribe ob3</option>
        <option value="case3">subscribe ob1, ob2 NEXT unsubscribe ob1, ob2 NEXT subscribe ob3</option>
      </select>
      <label>
        bufferSize:&nbsp;
        <input value={bufferSize.lastValue} onChange={event => setBufferSize(event.target.value)}/>
      </label>
      <button onClick={sameObs}>same Observable</button>
      <button onClick={sameObsWithShare}>same Observable + share()</button>
      <button onClick={sameObsWithShareReplayRcFalse}>same Observable + shareReplay(refCount: false, bufferSize: {bufferSize.lastValue})</button>
      <button onClick={sameObsWithShareReplayRcTrue}>same Observable + shareReplay(refCount: true, bufferSize: {bufferSize.lastValue})</button>
      <button onClick={sameObsWithMulticastReplay}>same Observable + multicast(new ReplaySubject({bufferSize.lastValue})), refCount</button>
      <button onClick={uniqObs}>uniq Observable</button>
      <button onClick={uniqObsWithShare}>uniq Observable + share()</button>
      <button onClick={uniqObsWithShareReplay}>uniq Observable + shareReplay({bufferSize.lastValue})</button>
      <button onClick={uniqSubj}>uniq Subject</button>
    </div>
  )
}
