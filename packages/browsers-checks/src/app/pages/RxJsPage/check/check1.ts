import {Observable, Subject} from '@do-while-for-each/rxjs'


export class Check1 {
  intervalId
  count = 0

  constructor(private subj: Subject<any>,
              private ob$1: Observable<any>,
              private ob$2: Observable<any>,
              private ob$3: Observable<any>) {
  }

  v1() {
    console.log(`START check v1`,)
    this.runInterval()
    console.log(`SUBSCRIBE ob1, ob2`)
    const subscr1 = this.subscribe(1)
    const subscr2 = this.subscribe(2)
    setTimeout(() => {
      subscr1.unsubscribe()
      subscr2.unsubscribe()
      console.log(`UNSUBSCRIBE ob1, ob2 on`, 2_000)
    }, 2_000)
    setTimeout(() => this.stopInterval(), 4_000)
  }

  v2() {
    console.log(`START check v2`,)
    this.runInterval()
    console.log(`SUBSCRIBE ob1, ob2`)
    const subscr1 = this.subscribe(1)
    const subscr2 = this.subscribe(2)
    setTimeout(() => {
      subscr2.unsubscribe()
      console.log(`UNSUBSCRIBE ob2 on`, 2_000)
    }, 2_000)
    setTimeout(() => {
      const subscr3 = this.subscribe(3)
      console.log(`SUBSCRIBE ob3 on`, 3_500)
    }, 3_500)
    setTimeout(() => this.stopInterval(), 5_000)
  }

  v3() {
    console.log(`START check v3`,)
    this.runInterval()
    console.log(`SUBSCRIBE ob1, ob2`)
    const subscr1 = this.subscribe(1)
    const subscr2 = this.subscribe(2)
    setTimeout(() => {
      subscr1.unsubscribe()
      subscr2.unsubscribe()
      console.log(`UNSUBSCRIBE ob1, ob2 on`, 2_000)
    }, 2_000)
    setTimeout(() => {
      const subscr3 = this.subscribe(3)
      console.log(`SUBSCRIBE ob3 on`, 3_500)
    }, 3_500)
    setTimeout(() => this.stopInterval(), 6_000)
  }


  runInterval() {
    this.intervalId = setInterval(() => {
      console.log(`---------- next interval ----------`,)
      this.subj.next({second: ++this.count})
    }, 1000)
  }

  stopInterval() {
    clearInterval(this.intervalId)
    this.count = 0
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

