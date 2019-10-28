import { fromEventPattern, Observable } from 'rxjs'
import { shareReplay } from 'rxjs/operators'
import { DockerEventEmitter, DockerEventType } from './createDockerEventEmitter'

export type ServiceDockerEventStream = Observable<DockerEventType>

export const createServiceDockerEventStream = (
  serviceName: string,
  eventEmitter: DockerEventEmitter,
): ServiceDockerEventStream => {
  return fromEventPattern<DockerEventType>(
    handler => {
      eventEmitter.addListener(serviceName, handler)
    },
    handler => {
      eventEmitter.removeListener(serviceName, handler)
    },
  ).pipe(shareReplay())
}
