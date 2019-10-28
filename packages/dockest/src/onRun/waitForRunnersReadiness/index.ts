import checkConnection from './checkConnection'
import checkResponsiveness from './checkResponsiveness'
import resolveContainerId from './resolveContainerId'
import runRunnerCommands from './runRunnerCommands'
import fixRunnerHostAccessOnLinux from './fixRunnerHostAccessOnLinux'
import { Runner } from '../../runners/@types'
import { DockestConfig } from '../../index'
import joinBridgeNetwork from '../joinBridgeNetwork'

const setupRunner = async (runner: Runner, initializer: string) => {
  runner.logger.info('Setup initiated')

  await resolveContainerId(runner)
  if (runner.isBridgeNetworkMode) {
    await joinBridgeNetwork(runner.containerId, runner.runnerConfig.service)
  }

  if (process.platform === 'linux' && !runner.isBridgeNetworkMode) {
    await fixRunnerHostAccessOnLinux(runner)
  }

  // these are now health checks
  // await checkConnection(runner)
  await checkResponsiveness(runner)

  runner.logger.info('Starting healthchecks.')
  const readinessCheckPromises = runner.map(runner => runnerConfig)

  const heathCheckPromisesSettled = readinessCheckPromises.map(p => p.catch(e => e))

  try {
    // wait until all health checks succeed or the container dies before
    await Promise.race([Promise.reject('Container died.'), Promise.all(readinessCheckPromises)])

    await runRunnerCommands(runner)
    runner.initializer = initializer

    runner.logger.info('Setup successful')
  } catch (err) {
    runner.logger.error('Either the container died or one of the healthchecks timed out.')
    // cancel all healthchecks
    for (const readinessCheck of runner.readinessChecks) {
      readinessCheck.cancel()
    }

    // wait until all promises have settled (either canceled or failed)
    await heathCheckPromisesSettled

    runner.logger.error('Setup failed.', { nl: 1 })
  }
}

const setupIfNotOngoing = async (runner: Runner, initializer: string) => {
  if (!!runner.initializer) {
    runner.logger.info(
      `"${runner.runnerConfig.service}" has already been setup by "${runner.initializer}" - skipping`,
      { nl: 1 },
    )
  } else {
    await setupRunner(runner, initializer)
  }
}

const setupRunnerWithDependencies = async (runner: Runner) => {
  // Setup runner's dependencies
  for (const depRunner of runner.runnerConfig.dependsOn) {
    await setupIfNotOngoing(depRunner, runner.runnerConfig.service)
  }

  await setupIfNotOngoing(runner, runner.runnerConfig.service)
}

export default async (config: DockestConfig) => {
  const setupPromises = []

  for (const runner of config.runners) {
    if (!!config.opts.runInBand) {
      await setupRunnerWithDependencies(runner)
    } else {
      setupPromises.push(setupRunnerWithDependencies(runner))
    }
  }

  await Promise.all(setupPromises)
}
