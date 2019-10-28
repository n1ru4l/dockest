import { BaseRunnerInterface, GetComposeService, SharedConfigProps, ComposeService } from './@types'
import { defaultGetComposeService } from './composeFileHelper'
import { SHARED_DEFAULT_CONFIG_PROPS } from './constants'
import Logger from '../Logger'
import { ReadinessCheck } from '../readiness-check/@types'

export abstract class AbstractRunner<TRunnerConfig extends SharedConfigProps> implements BaseRunnerInterface {
  private _containerId?: string
  public logger: Logger
  public runnerConfig: TRunnerConfig
  public readinessChecks: Array<ReadinessCheck> = []
  public initializer = ''
  public isBridgeNetworkMode = false

  constructor(configUserInput: TRunnerConfig) {
    this.runnerConfig = {
      ...SHARED_DEFAULT_CONFIG_PROPS,
      ...configUserInput,
    }
    this.logger = new Logger(this.runnerConfig.service)
  }

  public getComposeService: GetComposeService = () => defaultGetComposeService(this.runnerConfig)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public validateConfig() {}

  public mergeConfig({ ports, build, image, networks, ...composeService }: ComposeService) {
    this.runnerConfig = {
      ...this.runnerConfig,
      ...composeService,
      ...(image ? { image } : {}),
      ...(build ? { build } : {}),
      ...(ports ? { ports } : {}),
      ...(networks ? { networks: Object.keys(networks) } : {}),
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public setup() {}

  get containerId(): string {
    if (!this._containerId) {
      throw new Error('Cannot access containerId. Not set yet.')
    }
    return this._containerId
  }

  set containerId(id: string) {
    this._containerId = id
  }
}
