import { BRIDGE_NETWORK_NAME } from '../../constants'
import { execaWrapper } from '../execaWrapper'
import { Logger } from '../../Logger'

export const bridgeNetworkExists = async () => {
  const command = `docker network ls \
                    --filter driver=bridge
                    --filter name=${BRIDGE_NETWORK_NAME} \
                    --quiet`

  const networkExists = !!execaWrapper(command).stdout.trim()

  if (networkExists) {
    Logger.info(`Using existing network "${BRIDGE_NETWORK_NAME}"`)
  }

  return networkExists
}
