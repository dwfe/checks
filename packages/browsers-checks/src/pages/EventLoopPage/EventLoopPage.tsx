import React from 'react'
import {IRoutableProps} from '../../routing'
import {Timers} from '../../components/Timers';
import {AboutEventLoop} from './AboutEventLoop/AboutEventLoop';
import {WhatFreezesTheEventLoop} from './WhatFreezesTheEventLoop/WhatFreezesTheEventLoop';
import {useDocumentTitle} from '../../hooks/use-document-title'

export const EventLoopPage = (props: IRoutableProps) => {
  useDocumentTitle(props)

  return (
    <>
      <Timers/>
      <AboutEventLoop/>
      <WhatFreezesTheEventLoop/>
    </>
  );
}
