import React from 'react'
import {log, logError} from '../../../utils/globals';

export const MultipleRequestsToServer = () => {

  const totalRequests = 10

  const fetchDataFromServer = (name, i) => {
    log(`${name}: [${i}] -> send request`)
    return fetch('http://localhost:2020/long-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain', //'application/json;charset=utf-8',
      },
      body: `[${i}] ${name}`.substring(0, 14) + '...'
    })
  }

  const fetchPromiseThen = (name, i) =>
    fetchDataFromServer(name, i)
      .then(response => {
        log(`${name}: [${i}] <- response received from server`)
        return response.text()
      })
      .then(body => {
        log(`${name}: [${i}] parsed body = ${body}`,)
        return `[${i}] -> ${body}`
      })

  const fetchAwaitPromise = async (name, i): Promise<string> => {
    try {
      const response = await fetchDataFromServer(name, i)
      log(`${name}: [${i}] <- response received from server`)
      const body = await response.text()
      log(`${name}: [${i}] parsed body = ${body}`,)
      return `[${i}] -> ${body}`
    } catch (e) {
      throw e
    }
  }

  async function task_AwaitPromise_FetchServer(name = 'await Promise (Fetch data from Server)') {
    const result: string[] = []
    log(`${name}: start ${totalRequests} requests`,)
    try {
      for (let i = 0; i < totalRequests; i++) {
        result[i] = await fetchAwaitPromise(name, i)
      }
    } catch (e) {
      logError(name, e)
    }
    log(`${name}: result`, result)
  }

  function task_PromiseThen_FetchServer(name = 'Promise.then (Fetch data from Server)') {
    const result = []
    log(`${name}: start for ${totalRequests} requests`,)
    for (let i = 0; i < totalRequests; i++) {
      // @ts-ignore
      result[i] = fetchPromiseThen(name, i)
    }
    log(`${name}: result`, Promise.all(result))
    // log(`${name}: result`, result);
  }

  return (<>
    <h3>Multiple requests to Server that responds with a some delay</h3>
    <button onClick={() => task_AwaitPromise_FetchServer()}>await Promise</button>
    &nbsp;&nbsp;
    <button onClick={() => task_PromiseThen_FetchServer()}>Promise.then</button>
  </>)
}

