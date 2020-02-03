import assignRunnerSymbol from './assignRunnerSymbol'
import generateComposeFile from './generateComposeFile'
import setLogLevel from './setLogLevel'
import setupExitHandler from './setupExitHandler'
import createDockerSecrets from './createDockerSecrets'

import { DockestConfig } from '../index'

const onInstantiation = async (config: DockestConfig) => {
  setLogLevel(config)
  const { getSecretPath, cleanup } = await createDockerSecrets(config.secrets)
  const { composeFileConfig } = generateComposeFile(config, getSecretPath)
  assignRunnerSymbol(config)
  setupExitHandler(config)

  return { composeFileConfig, cleanup }
}

export default onInstantiation
