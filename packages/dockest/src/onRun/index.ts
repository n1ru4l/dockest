import dockerComposeUp from './dockerComposeUp'
import runJest from './runJest'
import waitForRunnersReadiness from './waitForRunnersReadiness'
import createBridgeNetwork from './createBridgeNetwork'
import joinBridgeNetwork from './joinBridgeNetwork'
import removeBridgeNetwork from './removeBridgeNetwork'
import leaveBridgeNetwork from './leaveBridgeNetwork'
import { createDockerEventEmitter } from './createDockerEventEmitter'
import { createContainerStartCheck } from './createContainerStartCheck'
import { createContainerDiedCheck } from './createContainerDiedCheck'
import { createServiceDockerEventStream } from './createServiceDockerEventStream'
import { DockestConfig } from '../index'
import Logger from '../Logger'
import sleepForX from '../utils/sleepForX'
import teardownSingle from '../utils/teardownSingle'

const onRun = async (config: DockestConfig) => {
  const {
    $: { perfStart, isInsideDockerContainer, hostname, dockerLogs },
    $,
    opts: {
      afterSetupSleep,
      dev: { debug },
    },
    runners,
  } = config

  const emitter = createDockerEventEmitter(runners)

  for (const runner of runners) {
    // runner.eventStream$ = createServiceDockerEventStream(runner.runnerConfig.service, emitter)
  }

  const containerStartedTasks = runners.map(runner =>
    createContainerStartCheck(runner, createServiceDockerEventStream(runner.runnerConfig.service, emitter)),
  )
  const containerDiedTasks = runners.map(runner =>
    createContainerDiedCheck(runner, createServiceDockerEventStream(runner.runnerConfig.service, emitter)),
  )

  const serviceNames = runners.map(runner => runner.runnerConfig.service)
  const dockerComposeUpProcess = dockerComposeUp(serviceNames)
  $.dockerComposeUpProcess = dockerComposeUpProcess

  if (dockerComposeUpProcess.stdout) {
    dockerComposeUpProcess.stdout.on('data', chunk => {
      dockerLogs.push(chunk.toString())
    })
  }

  if (dockerComposeUpProcess.stderr) {
    dockerComposeUpProcess.stderr.on('data', chunk => {
      dockerLogs.push(chunk.toString())
    })
  }

  if (isInsideDockerContainer) {
    await createBridgeNetwork()
    await joinBridgeNetwork(hostname, 'host.dockest-runner.internal')
  }

  // every single container should start
  await Promise.all(containerStartedTasks.map(task => task.done))

  // @TODO: abort/automatically fail readiness check in case container dies
  await waitForRunnersReadiness(config, containerDiedTasks)

  if (afterSetupSleep > 0) {
    await sleepForX('After setup sleep', afterSetupSleep)
  }

  if (debug || process.argv.includes('dev') || process.argv.includes('debug')) {
    Logger.info(`Debug mode enabled, containers are kept running and Jest will not run.`)

    config.runners.forEach((runner, index) =>
      Logger.info(
        `[${index + 1}/${config.runners.length} | ${runner.runnerConfig.service}] ${JSON.stringify(
          {
            service: runner.runnerConfig.service,
            containerId: runner.containerId,
            dependsOn: runner.runnerConfig.dependsOn,
          },
          null,
          2,
        )}\n`,
      ),
    )

    return // Keep the docker containers running indefinitely
  }

  const allTestsPassed = await runJest(config)

  for (const runner of config.runners) {
    await teardownSingle(runner)
  }

  dockerComposeUpProcess.cancel()
  await dockerComposeUpProcess.catch(() => {})
  emitter.destroy()

  Logger.info('Docker Container Logs\n' + dockerLogs.join(''))

  if (isInsideDockerContainer) {
    await leaveBridgeNetwork(hostname)
    await removeBridgeNetwork()
  }

  Logger.perf(perfStart)
  allTestsPassed ? process.exit(0) : process.exit(1)
}

export default onRun
