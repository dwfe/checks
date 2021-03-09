import {combineLatest, Observable, Subscription} from 'rxjs'
import {debounceTime, filter, map, mapTo, shareReplay, tap} from 'rxjs/operators'
import {log} from '../../../common';
import {InputValidator} from './TimerInput/input.validator'

export class TimerFactory {
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
    debounceTime(500),
    filter(() => this.isFactoryRun),
    tap(() => this.stopTimers()),
    map(TimerFactory.convertTimerParams),
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

  static convertTimerParams([count, interval]: string[]): number[] | false {
    return InputValidator.isCountValidFn(count) && InputValidator.isIntervalValidFn(interval)
      ? [+count, +interval]
      : false
  }

  static forEffect(count$: Observable<string>, interval$: Observable<string>) {
    const factory = new TimerFactory(count$, interval$)
    factory.start();
    return () => factory.stop();
  }

}

