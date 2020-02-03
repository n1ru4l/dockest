import { ComposeFile } from '../../runners/@types'

export default (config: ComposeFile, getSecretPath: (secretName: string) => string) => {
  if (Array.isArray(config.secrets)) {
    for (const service of Object.values(config.services)) {
      if (!service.secrets) continue
      if (!service.volumes) {
        service.volumes = []
      }
      for (const secret of service.secrets) {
        service.volumes.push(`${getSecretPath(secret)}:/run/secrets/${secret}:ro`)
      }
    }
  }
}
