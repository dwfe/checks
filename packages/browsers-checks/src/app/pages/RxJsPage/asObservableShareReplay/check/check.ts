import {Observable, Subject} from '@do-while-for-each/rxjs'


export class Check {
  intervalId
  count = 0

  constructor(private subj: Subject<any>,
              private ob$1: Observable<any>,
              private ob$2: Observable<any>,
              private ob$3: Observable<any>) {
  }

  case1() {
    console.log(`START check v1`,)
    this.runInterval()
    console.log(`SUBSCRIBE ob1, ob2`)
    const subscr1 = this.subscribe(1)
    const subscr2 = this.subscribe(2)
    setTimeout(() => {
      console.log(`UNSUBSCRIBE ob1, ob2 on`, 20)
      subscr1.unsubscribe()
      subscr2.unsubscribe()
    }, 20)
    setTimeout(() => this.stopInterval(), 40)
  }

  case2() {
    console.log(`START check v2`,)
    this.runInterval()
    console.log(`SUBSCRIBE ob1, ob2`)
    this.subscribe(1)
    const subscr2 = this.subscribe(2)
    setTimeout(() => {
      console.log(`UNSUBSCRIBE ob2 on`, 20)
      subscr2.unsubscribe()
    }, 20)
    setTimeout(() => {
      console.log(`SUBSCRIBE ob3 on`, 35)
      this.subscribe(3)
    }, 35)
    setTimeout(() => this.stopInterval(), 50)
  }

  case3() {
    console.log(`START check v3`,)
    this.runInterval()
    console.log(`SUBSCRIBE ob1, ob2`)
    const subscr1 = this.subscribe(1)
    const subscr2 = this.subscribe(2)
    setTimeout(() => {
      console.log(`UNSUBSCRIBE ob1, ob2 on`, 20)
      subscr1.unsubscribe()
      subscr2.unsubscribe()
    }, 20)
    setTimeout(() => {
      console.log(`SUBSCRIBE ob3 on`, 35)
      this.subscribe(3)
    }, 35)
    setTimeout(() => this.stopInterval(), 60)
  }


  runInterval() {
    this.intervalId = setInterval(() => {
      const interval = ++this.count * 10
      console.log(`---------- next interval ${interval} ----------`,)
      this.subj.next({interval})
    }, 10)
  }

  stopInterval() {
    clearInterval(this.intervalId)
    this.count = 0
    this.subj.complete()
  }

  subscribe(item: number) {
    let ob$
    switch (item) {
      case 1:
        ob$ = this.ob$1
        break;
      case 2:
        ob$ = this.ob$2
        break;
      case 3:
        ob$ = this.ob$3
        break;
      default:
        throw new Error(`Check.subscribe unknown item '${item}'`)
    }
    return ob$.subscribe(data => console.log(`ob${item}`, data))
  }
}

