import { default as fs } from 'fs'
import { default as yaml } from 'js-yaml'
import createComposeObjFromComposeFile from './createComposeObjFromComposeFile'
import createComposeObjFromRunners from './createComposeObjFromRunners'
import transformComposeObjToRunners from './transformComposeObjToRunners'
import { DockestConfig } from '../../index'
import {
  GENERATED_COMPOSE_FILE_PATH,
  GENERATED_RUNNER_COMPOSE_FILE_PATH,
  GENERATED_RUNNER_COMPOSE_FILE_NAME,
} from '../../constants'

export default (config: DockestConfig, getSecretPath: (secretname: string) => string) => {
  const configFiles = []
  if (config.opts.composeFile) {
    if (Array.isArray(config.opts.composeFile)) {
      configFiles.push(...config.opts.composeFile)
    } else {
      configFiles.push(config.opts.composeFile)
    }
  }

  let { version: dockerComposeFileVersion } = createComposeObjFromComposeFile(configFiles)
  const versionNumber = parseFloat(dockerComposeFileVersion)
  if (Math.trunc(versionNumber) < 3) {
    throw new TypeError(`Incompatible docker-compose file version. Please use version '3.x'.`)
  } else if (versionNumber !== 3.7) {
    console.warn(`You should upgrade to docker-compose file version '3.7'. Dockest automatically uses that version.`) // eslint-disable-line no-console
    dockerComposeFileVersion = '3.7'
  }

  const composeObjFromRunners = createComposeObjFromRunners(config, dockerComposeFileVersion)

  fs.writeFileSync(GENERATED_RUNNER_COMPOSE_FILE_PATH, yaml.safeDump(composeObjFromRunners))
  configFiles.push(GENERATED_RUNNER_COMPOSE_FILE_NAME)

  // merge all config
  const composeObjFromComposeFile = createComposeObjFromComposeFile(configFiles)

  if (config.opts.guessRunnerType) {
    config.runners = transformComposeObjToRunners(config, composeObjFromComposeFile)
  }

  // inject secrets
  if (Array.isArray(config.secrets)) {
    for (const service of Object.values(composeObjFromComposeFile.services)) {
      if (!service.secrets) continue
      if (!service.volumes) {
        service.volumes = []
      }
      for (const secret of service.secrets) {
        service.volumes.push(`${getSecretPath(secret)}:/run/secrets/${secret}:ro`)
      }
    }
  }

  // write final config to fs
  fs.writeFileSync(GENERATED_COMPOSE_FILE_PATH, yaml.safeDump(composeObjFromComposeFile))
  // set environment variable that can be used with the test-helpers
  // jest.runCLI will pass this environment variable into the testcase runners
  process.env.DOCKEST_INTERNAL_CONFIG = JSON.stringify(composeObjFromComposeFile)

  return { composeFileConfig: composeObjFromComposeFile }
}
