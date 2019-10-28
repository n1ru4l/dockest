import { ReplaySubject } from 'rxjs'

import { createContainerStartCheck } from './createContainerStartCheck'
import { DockerEventType } from './createDockerEventEmitter'
import { Runner } from '../runners/@types'

it('can be created', async () => {
  const subject$ = new ReplaySubject<DockerEventType>()
  const logger = { info: jest.fn(), error: jest.fn() }
  const mockRunner = ({
    runnerConfig: { service: 'abc' },
    logger,
  } as unknown) as Runner

  const check = createContainerStartCheck(mockRunner, subject$)

  subject$.next({
    type: 'container',
    action: 'start',
    id: '12313',
    service: 'abc',
    time: String(new Date()),
    attributes: {
      image: 'mock',
      name: 'abc',
    },
  })

  await check.done
  expect(logger.info).toHaveBeenCalledTimes(0)
})
