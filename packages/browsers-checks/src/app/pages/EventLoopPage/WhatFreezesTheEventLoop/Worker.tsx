import React from 'react';
import {log} from '../../../../common';


export const WorkerTask = () => {

  function task_InsideWorker(event, seconds = 5) {
    worker.postMessage({seconds})
  }

  worker.onmessage = function (e) {
    log(`Worker:`, e.data);
  }

  return (<>
    <h3>Long task inside Worker</h3>
    <button onClick={task_InsideWorker}>Worker</button>
  </>)
}

const workerScript = function () {
  function longTask(seconds = 5) {
    const ms = seconds * 1000
    const time = +new Date();
    while (+new Date() - time < ms) {
    }
    console.log(`Worker: long task ${seconds} seconds, done`,)
  }

  self.onmessage = function ({data}) { /* eslint-disable-line no-restricted-globals */
    console.log(`Worker: new task`, data)
    longTask(data.seconds)
    // @ts-ignore
    self.postMessage('task complete!'); /* eslint-disable-line no-restricted-globals */
  }
};
const blob = new Blob([`(${workerScript.toString()})()`]);
const url = URL.createObjectURL(blob);
const worker = new Worker(url);
URL.revokeObjectURL(url);
