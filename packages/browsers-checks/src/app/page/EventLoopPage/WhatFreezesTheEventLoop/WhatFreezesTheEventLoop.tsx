import React from 'react'
import {PromisedTaskInsideMainThread} from './PromisedTaskInsideMainThread';
import {WorkerTask} from './Worker';
import {MultipleRequestsToServer} from './MultipleRequestsToServer';


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
