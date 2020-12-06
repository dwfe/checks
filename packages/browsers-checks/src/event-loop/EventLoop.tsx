import React from 'react';
import {Microtasks} from './about-event-loop'
import {MultipleRequestsToServer, PromisedTaskInsideMainThread, Timers, WorkerTask} from './what-freezes-event-loop';

export const EventLoop = () => {
  return (<>

    <h1>About the EventLoop</h1>
    <Microtasks/>

    <h1>What freezes the EventLoop?</h1>
    <Timers/>
    <PromisedTaskInsideMainThread/>
    <WorkerTask/>
    <MultipleRequestsToServer/>
  </>);
}
