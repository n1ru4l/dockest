import EventEmitter from 'events'
import execa from 'execa' /* eslint-disable-line import/default */
import { GENERATED_COMPOSE_FILE_PATH } from '../constants'
import { Runner } from '../runners/@types'

const parseJsonSafe = (data: string) => {
  try {
    return JSON.parse(data)
  } catch (err) {
    return null
  }
}

export const createDockerEventEmitter = (services: Array<Runner>) => {
  const command = ` \
              docker-compose \
              -f ${GENERATED_COMPOSE_FILE_PATH} \
              events \
              --json  \
              ${services.map(service => service.runnerConfig.service).join(' ')}
            `
  const childProcess = execa(command, { shell: true, reject: false })

  if (!childProcess.stdout) {
    childProcess.kill()
    throw new Error('Event Process has not output stream.')
  }

  const emitter = new EventEmitter()

  // without this line only the first data event is fired (in some undefinable cases)
  childProcess.then(() => {})

  childProcess.stdout.addListener('data', chunk => {
    const lines = chunk
      .toString()
      .split(`\n`)
      .filter(Boolean)
    for (const line of lines) {
      const data = parseJsonSafe(line)
      if (!data) return
      emitter.emit(data.service, data)
    }
  })

  return {
    emitter,
    destroyEmitter: async () => {
      childProcess.cancel()
    },
  }
}

export const createContainerReadinessCheck = (emitter: EventEmitter, service: Runner) => {
  let resolve = () => {}
  const interval = setInterval(() => {
    service.logger.info('Still waiting for start event...')
  }, 10000)

  const listener = (ev: any) => {
    if (ev.action === 'start' || ev.action === 'attach') {
      clearInterval(interval)
      emitter.removeListener(service.runnerConfig.service, listener)
      service.logger.info('Received start event.')
      resolve()
    }
  }

  emitter.addListener(service.runnerConfig.service, listener)
  service.logger.info('Waiting for start event.')

  return new Promise(_resolve => (resolve = _resolve))
}
