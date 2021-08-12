import React from 'react'
import {PromisedTaskInsideMainThread} from './PromisedTaskInsideMainThread'
import {MultipleRequestsToServer} from './MultipleRequestsToServer'
import {WorkerTask} from './Worker'


export const WhatFreezesTheEventLoop = () => {

  return (
    <div>
      <h1>What freezes the EventLoop?</h1>
      <PromisedTaskInsideMainThread/>
      <WorkerTask/>
      <MultipleRequestsToServer/>
    </div>
  );
}
