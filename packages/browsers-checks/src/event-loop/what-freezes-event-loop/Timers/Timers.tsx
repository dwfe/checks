import React, {useEffect} from 'react'
import {combineLatest, Observable, Subscription} from 'rxjs'
import {debounceTime, filter, map, mapTo, shareReplay, tap} from 'rxjs/operators'
import classNames from 'classnames'
import {useSubjState} from '../../../utils/hooks/useSubjState'
import {isNumeric, log} from '../../../utils/globals'
import './styles.css'


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

//region Validators
const isPositiveNumberValidFn = (data, isNumberValidFn): boolean => {
  if (data === '')
    return false;   // IF empty string -> invalid
  const value = +data
  if (!isNumberValidFn(value))
    return false;   // IF not a number -> invalid
  return value >= 0 // ELSE number must be positive
}
const isCountValidFn = data => isPositiveNumberValidFn(data, Number.isInteger) // целые - кол-во таймеров
const isIntervalValidFn = data => isPositiveNumberValidFn(data, isNumeric)     // дробные - интервал каждого таймера в секундах
//endregion

const invalidClass = (value: string, isValidFn) => isValidFn(value) ? '' : 'input-invalid'
const convertTimerParams = ([count, interval]: string[]): number[] | false =>
  isCountValidFn(count) && isIntervalValidFn(interval)
    ? [+count, +interval]
    : false


class TimerFactory {
  private timers: number[] = []

  private isFactoryRun = false
  private subscriptions: Subscription[] = []

  constructor(private count$: Observable<string>,
              private interval$: Observable<string>) {
  }

  start() {
    this.isFactoryRun = true
    this.subscriptions.push(this.build$.subscribe())
  }

  stop() {
    this.isFactoryRun = false
    this.stopTimers()
    this.subscriptions.forEach(s => s.unsubscribe())
    this.subscriptions.length = 0
  }

  private build$: Observable<null> = combineLatest([this.count$, this.interval$]).pipe(
    debounceTime(1000),
    filter(() => this.isFactoryRun),
    tap(() => this.stopTimers()),
    map(convertTimerParams),
    filter(params => !!params),
    tap((params: number[]) => this.startTimers(params)),
    mapTo(null),
    shareReplay(1)
  )

  private startTimers([countOfTimers, intervalInSeconds]: number[]) {
    if (countOfTimers === 0)
      return;
    log(`start timers: count ${countOfTimers}, interval ${intervalInSeconds} seconds`,)
    for (let i = 0; i < countOfTimers; i++) {
      const id = window.setInterval(
        () => log(`Timer#${i} is running - interval ${intervalInSeconds} seconds`),
        intervalInSeconds * 1000
      )
      this.timers.push(id)
    }
  }

  stopTimers() {
    if (this.timers.length === 0) return

    log(`stop ${this.timers.length} timers`)
    this.timers.forEach(clearInterval)
    this.timers.length = 0
  }

}
