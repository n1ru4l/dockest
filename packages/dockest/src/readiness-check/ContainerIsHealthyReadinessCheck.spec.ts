import { Subject, ReplaySubject } from 'rxjs'
import { ReadinessCheckResult } from './@types'
import { ContainerIsHealthyReadinessCheck } from './ContainerIsHealthyReadinessCheck'
import { ServiceDockerEventStream } from '../onRun/createServiceDockerEventStream'
import { Runner } from '../runners/@types'
import {
  HealthStatusDockerComposeEvent,
  DockerEventType,
  CreateDockerComposeEvent,
} from '../onRun/createDockerEventEmitter'

it('can be created', () => {
  new ContainerIsHealthyReadinessCheck({ timeout: 0 })
})

it('can timeout', async done => {
  const healthCheck = new ContainerIsHealthyReadinessCheck({ timeout: 1 })

  const eventStream$: ServiceDockerEventStream = new ReplaySubject()

  const promise = healthCheck.start({} as Runner, eventStream$)

  const status = await promise
  expect(status).toEqual(ReadinessCheckResult.TIMEOUT)
  done()
})

it('it succeeds the healthcheck in case the correct health_status event is emitted', async done => {
  const healthCheck = new ContainerIsHealthyReadinessCheck({ timeout: 100 })

  const event: HealthStatusDockerComposeEvent = {
    id: 'unique-id',
    action: 'health_status',
    service: 'my-service',
    time: String(new Date()),
    type: 'container',
    attributes: {
      healthStatus: 'healthy',
      image: 'my-image',
      name: 'crazy-alpaca',
    },
  }

  const eventStream$ = new ReplaySubject<DockerEventType>()
  eventStream$.next(event)

  const promise = healthCheck.start({} as Runner, eventStream$)

  const status = await promise
  expect(status).toEqual(ReadinessCheckResult.SUCCESS)
  done()
})

it('it does not succeed case an "unhealthy" correct health_status event is emitted', async done => {
  const healthCheck = new ContainerIsHealthyReadinessCheck({ timeout: 100 })

  const event: HealthStatusDockerComposeEvent = {
    id: 'unique-id',
    action: 'health_status',
    service: 'my-service',
    time: String(new Date()),
    type: 'container',
    attributes: {
      healthStatus: 'unhealthy',
      image: 'my-image',
      name: 'crazy-alpaca',
    },
  }

  const eventStream$ = new Subject<DockerEventType>()
  eventStream$.next(event)

  const promise = healthCheck.start({} as Runner, eventStream$)

  const status = await promise
  expect(status).toEqual(ReadinessCheckResult.TIMEOUT)
  done()
})

it('ignores unrelated events', async done => {
  const healthCheck = new ContainerIsHealthyReadinessCheck({ timeout: 100 })

  const event: CreateDockerComposeEvent = {
    id: 'unique-id',
    action: 'create',
    service: 'my-service',
    time: String(new Date()),
    type: 'container',
    attributes: {
      image: 'my-image',
      name: 'crazy-alpaca',
    },
  }

  const eventStream$ = new Subject<DockerEventType>()
  eventStream$.next(event)

  const promise = healthCheck.start({} as Runner, eventStream$)

  const status = await promise
  expect(status).toEqual(ReadinessCheckResult.TIMEOUT)
  done()
})

it('can be canceled', async done => {
  const healthCheck = new ContainerIsHealthyReadinessCheck({ timeout: 100 })

  const eventStream$ = new Subject<DockerEventType>()

  const promise = healthCheck.start({} as Runner, eventStream$)

  healthCheck.cancel()

  const status = await promise
  expect(status).toEqual(ReadinessCheckResult.CANCEL)
  done()
})
