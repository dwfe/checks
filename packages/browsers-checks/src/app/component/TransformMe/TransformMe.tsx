import {animationFrame, debounceTime, delay, startWith, tap} from '@do-while-for-each/rxjs'
import {TWebMatrix, WebMatrix} from '@do-while-for-each/math'
import React, {useEffect, useRef, useState} from 'react'
import {ElementHandler, ElementInteractive, InteractiveVariant, WrapHandler} from '../../../interactive'
import s from './TransformMe.module.css'

export function TransformMe({wrapHandler, startTransform, variants, textInactive}: IProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [text, setText] = useState(textInactive)

  useEffect(() => {
    const element = ref.current as HTMLDivElement;
    let styleTransformSubscription, containerTextSubscription

    const handler = new ElementHandler(element, wrapHandler)
    const interactive = new ElementInteractive(handler, startTransform, variants)

    styleTransformSubscription = interactive.resultMatrix$.pipe(
      startWith(WebMatrix.identity()),
      delay(0, animationFrame),
      tap(m => element.style.transform = WebMatrix.toStyleValue(m))
    ).subscribe()

    if (textInactive)
      interactive.resultMatrix$.pipe(
        tap(() => setText('Yeah!')),
        debounceTime(500),
        tap(() => setText(textInactive)),
      ).subscribe()

    return () => {
      handler.stop()
      interactive.stop()
      styleTransformSubscription?.unsubscribe()
      containerTextSubscription?.unsubscribe()
    }
  }, [wrapHandler, startTransform, variants, textInactive])

  return (
    <div className={s.container} ref={ref}>
      <div>{text}</div>
    </div>
  );
}

interface IProps {
  wrapHandler: WrapHandler;
  startTransform: TWebMatrix;
  variants?: InteractiveVariant[];
  textInactive?: string;
}
