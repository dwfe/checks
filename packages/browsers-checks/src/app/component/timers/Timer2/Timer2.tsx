import {combineLatest, skip, Subj, Subject, takeUntil, tap} from '@do-while-for-each/rxjs'
import React from 'react'
import {TimerInput} from '../TimerInput/TimerInput'
import {TimerFactory} from '../TimerFactory'

interface IProps {
  count: string;
  interval: string;
}

interface IState {
  i: number
}

export class Timer2 extends React.Component<IProps, IState> {

  /**
   * State
   */
  private count = new Subj({type: 'shareReplay + refCount'}, '0');
  private interval = new Subj({type: 'shareReplay + refCount'}, '0');

  private timerFactory = new TimerFactory(this.count.value$, this.interval.value$)
  private unsubscribeSubj = new Subject()

  constructor(props: IProps) {
    super(props);
    this.count.setValue(props.count || '1');
    this.interval.setValue(props.interval || '0.3');
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
      this.count.setValue(nextProps.count);
      this.interval.setValue(nextProps.interval);
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
    // console.log(`render`, JSON.stringify(this.state))
    const count = this.count.lastValue as string;
    const interval = this.interval.lastValue as string;
    return (
      <div className="Timers">
        <h3>Timers2</h3>
        <TimerInput label="count" value={count} setValue={this.count.setValue}/>&nbsp;&nbsp;&nbsp;
        <TimerInput label="interval" value={interval} setValue={this.interval.setValue}/>
      </div>
    );
  }

}
