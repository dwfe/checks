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
      console.log(`UNSUBSCRIBE ob1, ob2 on`, 200)
    }, 200)
    setTimeout(() => this.stopInterval(), 400)
  }

  v2() {
    console.log(`START check v2`,)
    this.runInterval()
    console.log(`SUBSCRIBE ob1, ob2`)
    this.subscribe(1)
    const subscr2 = this.subscribe(2)
    setTimeout(() => {
      subscr2.unsubscribe()
      console.log(`UNSUBSCRIBE ob2 on`, 200)
    }, 200)
    setTimeout(() => {
      this.subscribe(3)
      console.log(`SUBSCRIBE ob3 on`, 350)
    }, 350)
    setTimeout(() => this.stopInterval(), 500)
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
      console.log(`UNSUBSCRIBE ob1, ob2 on`, 200)
    }, 200)
    setTimeout(() => {
      this.subscribe(3)
      console.log(`SUBSCRIBE ob3 on`, 350)
    }, 350)
    setTimeout(() => this.stopInterval(), 600)
  }


  runInterval() {
    this.intervalId = setInterval(() => {
      const interval = ++this.count * 100
      console.log(`---------- next interval ${interval} ----------`,)
      this.subj.next({interval})
    }, 100)
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

