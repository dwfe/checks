import {skip, takeUntil, tap} from 'rxjs/operators'
import {combineLatest, Subject} from 'rxjs'
import classNames from 'classnames'
import React from 'react'
import {invalidClass, isCountValidFn, isIntervalValidFn} from './globals'
import {SubjectWrap} from '../../../hooks.utils/subject.wrap'
import {TimerFactory} from './TimerFactory'
import './styles.css'


interface IProps {
  count: string;
  interval: string;
}

interface IState {
  i: number
}

export class Timers2 extends React.Component<IProps, IState> {

  /**
   * State
   */
  private count = new SubjectWrap('0');
  private interval = new SubjectWrap('0');

  private timerFactory = new TimerFactory(this.count.value$, this.interval.value$)
  private unsubscribeSubj = new Subject()

  constructor(props: IProps) {
    super(props);
    this.count.value = props.count || '1';
    this.interval.value = props.interval || '0.3';
    this.state = {i: 0};
  }

  componentDidMount() {
    this.timerFactory.start()
    this.render$.pipe(
      takeUntil(this.unsubscribeSubj.asObservable())
    ).subscribe()
  }

  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
    if (this.props !== nextProps) {
      this.count.value = nextProps.count
      this.interval.value = nextProps.interval
    }
    return true;
  }

  componentWillUnmount() {
    this.timerFactory.stop()
    this.unsubscribeSubj.next(true)
    this.unsubscribeSubj.complete();
  }

  private render$ = combineLatest([this.count.value$, this.interval.value$]).pipe(
    skip(1), // first state has already been drawn when creating the component
    tap(() => this.setState({i: this.state.i + 1})),
  )

  render() {
    console.log(`render`, JSON.stringify(this.state))
    const count = this.count.value;
    const interval = this.interval.value;
    return (
      <div className="Timers">
        <h3>Timers2</h3>
        <label>
          count&nbsp;
          <input type="string"
                 className={classNames(invalidClass(count, isCountValidFn))}
                 onChange={event => this.count.value = event.target.value}
                 value={count}
          />
        </label>&nbsp;&nbsp;&nbsp;
        <label>
          interval&nbsp;
          <input type="string"
                 className={classNames(invalidClass(interval, isIntervalValidFn))}
                 onChange={event => this.interval.value = event.target.value}
                 value={interval}
          />&nbsp;seconds
        </label>
      </div>
    );
  }

}
