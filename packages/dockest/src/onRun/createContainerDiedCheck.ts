import { Subject, race } from 'rxjs'
import { takeUntil, tap, first, mapTo } from 'rxjs/operators'
import { ServiceDockerEventStream } from './createServiceDockerEventStream'
import { Runner } from '../runners/@types'

export interface ContainerDiedTask {
  service: string
  done: Promise<void>
  cancel: () => void
}

export const createContainerDiedCheck = (runner: Runner, eventStream$: ServiceDockerEventStream): ContainerDiedTask => {
  const stop$ = new Subject()

  const cancel$ = new Subject()

  const containerDies$ = eventStream$.pipe(
    takeUntil(stop$),
    first(event => event.action === 'die'),
  )

  return {
    service: runner.runnerConfig.service,
    done: race(containerDies$, cancel$)
      .pipe(
        tap({
          next: () => {
            stop$.next()
            stop$.complete()
          },
        }),
        mapTo(undefined),
      )
      .toPromise(),
    cancel: () => {
      cancel$.complete()
    },
  }
}
