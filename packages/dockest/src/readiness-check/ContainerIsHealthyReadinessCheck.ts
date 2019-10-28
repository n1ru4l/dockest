import { mapTo, first, take, tap, takeUntil } from 'rxjs/operators'
import { race, timer, Subject } from 'rxjs'

import { ReadinessCheck, ReadinessCheckResult } from './@types'
import { Runner } from '../runners/@types'
import { ServiceDockerEventStream } from '../onRun/createServiceDockerEventStream'

export class ContainerIsHealthyReadinessCheck implements ReadinessCheck {
  private timeout: number

  constructor({ timeout = 500 }: { timeout?: number }) {
    this.timeout = timeout
  }

  public start(_runner: Runner, eventStream$: ServiceDockerEventStream) {
    const stop$ = new Subject()

    const healthyEventEmitted$ = eventStream$.pipe(
      takeUntil(stop$),
      first(event => event.action === 'health_status' && event.attributes.healthStatus === 'healthy'),
      mapTo(ReadinessCheckResult.SUCCESS),
    )

    const timeout$ = timer(this.timeout).pipe(
      takeUntil(stop$),
      mapTo(ReadinessCheckResult.TIMEOUT),
    )

    const cancelSubject = new Subject()
    this.cancel = () => {
      cancelSubject.next()
      cancelSubject.complete()
    }
    const cancel$ = cancelSubject.pipe(mapTo(ReadinessCheckResult.CANCEL))

    const $race = race(healthyEventEmitted$, timeout$, cancel$).pipe(
      take(1),
      tap({
        complete: () => {
          stop$.next()
          stop$.complete()
        },
      }),
    )

    return $race.toPromise()
  }

  public cancel() {
    throw new Error('Cannot cancel before started.')
  }
}
