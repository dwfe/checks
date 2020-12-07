import React from 'react';
import {log} from '../../../utils/globals';

export const PromisedTaskInsideMainThread = () => {

  const durationOfLongTask = 3 // seconds

  function longTask(seconds, name, resolve) {
    log(`${name}: start long task inside Main thread`,)
    const ms = seconds * 1000
    for (const past = Date.now(); Date.now() - past < ms;) ;
    log(`${name}: long task ${seconds} seconds inside Main thread, done`,)
    resolve(`${name}: long task result`);
  }

  function longTaskThroughTimeout(seconds, name, resolve) {
    setTimeout(() => longTask(seconds, name, resolve), 10)
  }

  function taskFn(throughTimeout) {
    return throughTimeout ? longTaskThroughTimeout : longTask
  }

  async function task_AwaitPromise_InsideMainThread(throughTimeout = false, name = 'await Promise (Main thread)', seconds = durationOfLongTask) {
    try {
      const result = await new Promise(resolve => {
        taskFn(throughTimeout)(seconds, name, resolve)
        log(`${name}: promise body next line`);
      });
      log(result);
    } catch (e) {
      log(name, e)
    }
    log(`${name}: last line`);
  }

  function task_PromiseThen_InsideMainThread(throughTimeout = false, name = 'Promise.then (Main thread)', seconds = durationOfLongTask) {
    new Promise(resolve => {
      taskFn(throughTimeout)(seconds, name, resolve)
      log(`${name}: promise body next line`);
    })
      .then(result => log(result))
      .catch(e => log(name, e));
    log(`${name}: last line`);
  }

  return (<>
    <h3>Long task inside Main-thread</h3>
    <button onClick={() => task_AwaitPromise_InsideMainThread()}>await Promise</button>
    &nbsp;&nbsp;
    <button onClick={() => task_PromiseThen_InsideMainThread()}>Promise.then</button>

    <h3>Long task inside Main-thread through Timeout</h3>
    <button onClick={() => task_AwaitPromise_InsideMainThread(true)}>await Promise</button>
    &nbsp;&nbsp;
    <button onClick={() => task_PromiseThen_InsideMainThread(true)}>Promise.then</button>
  </>)
}
