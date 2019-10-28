import getDependsOn from './getDependsOn'
import getPorts from './getPorts'
import { ComposeService, SharedConfigProps } from '../@types'

const composeFileHelper = (runnerConfig: SharedConfigProps): ComposeService => {
  const { dependsOn, image, build, ports, props, networks: userNetworks } = runnerConfig

  let networks
  if (userNetworks) {
    networks = userNetworks.reduce((acc: { [key: string]: null }, curr) => {
      acc[curr] = null
      return acc
    }, {})
  }

  return {
    ...(dependsOn ? getDependsOn(dependsOn) : {}),
    ...(image && image.length ? { image } : {}),
    ...(build ? { build } : {}),
    ...(networks ? { networks } : {}),
    ports,
    ...props, // FIXME: Would love to type this stronger
  }
}

const defaultGetComposeService = (runnerConfig: SharedConfigProps): ComposeService => ({
  ...composeFileHelper(runnerConfig),
})

export { defaultGetComposeService, getDependsOn, getPorts }
export default composeFileHelper
