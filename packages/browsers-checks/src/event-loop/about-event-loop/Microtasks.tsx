import React from 'react'
import {log} from '../../utils/globals'

export const Microtasks = () => {

  const promiseMicrotaskQueue1 = (event, name = 'Promise.MicrotaskQueue 1') => {
    log(`${name}: start`)
    new Promise<void>((resolve, reject) => {
      log(`${name}: promise body`,)
      resolve()
    })
      .then(res => log(`${name}: .then1(...)`,))
      .then(res => log(`${name}: .then2(...)`,))
      .then(res => log(`${name}: .then3(...)`,))
      .then(res => log(`${name}: .then4(...)`,))
      .then(res => log(`${name}: .then5(...)`,))
      .then(res => log(`${name}: .then6(...)`,))
      .then(res => log(`${name}: .then7(...)`,))
      .then(res => log(`${name}: .then8(...)`,))
      .then(res => log(`${name}: .then9(...)`,))
      .then(res => log(`${name}: .then10(...)`,))
    log(`${name}: after promise`)
  }

  const promiseMicrotaskQueue2 = (event, name = 'Promise.MicrotaskQueue 2') => {
    log(`${name}: start`)
    new Promise((resolve, reject) => {
      const id = `${name}: promise body #1`
      log(id)
      resolve(id)
    })
      .then(res => {
        log(`${res} -> .then1(...)`,)
        return res
      })
      .then(res => {
        log(`${res} -> .then2(...)`,)
        return res
      })
      .then(res => log(`${res} -> .then3(...)`,))

    new Promise((resolve, reject) => {
      const id = `${name}: promise body #2`
      log(id)
      resolve(id)
    })
      .then(res => {
        log(`${res} -> .then1(...)`,)
        return res
      })
      .then(res => {
        log(`${res} -> .then2(...)`,)
        return res
      })
      .then(res => log(`${res} -> .then3(...)`,))

    log(`${name}: after promise`)
  }

  function promiseMicrotask3InnerFn(name) {
    new Promise((resolve, reject) => {
      const id = `${name}: promise body #1`
      log(`${id}, fn2`)
      resolve(id)
    })
      .then(res => {
        log(`${res} -> .then1(...), fn2`,)
        return res
      })
      .then(res => {
        log(`${res} -> .then2(...), fn2`,)
        return res
      })
      .then(res => log(`${res} -> .then3(...), fn2`,))
    log(`${name}: after promise, fn2`)
  }

  const promiseMicrotaskQueue3 = (event, name = 'Promise.MicrotaskQueue 3') => {
    log(`${name}: start, fn1`)
    promiseMicrotask3InnerFn(name)
    log(`${name}: last line, fn1`)
  }


  return (<>
    <h3>Microtasks</h3>
    <button onClick={promiseMicrotaskQueue1}>Promise.MicrotaskQueue 1</button>
    <br/>
    <button onClick={promiseMicrotaskQueue2}>Promise.MicrotaskQueue 2</button>
    <br/>
    <button onClick={promiseMicrotaskQueue3}>Promise.MicrotaskQueue 3</button>
  </>)
}
