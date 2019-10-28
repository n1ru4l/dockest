import Logger from '../../Logger'
import validateConfig from '../../utils/validateConfig'
import validateTypes from '../../utils/validateTypes'
import {
  BaseRunnerInterface,
  GetComposeService,
  SharedRequiredConfigProps,
  SharedDefaultableConfigProps,
  ComposeService,
} from '../@types'
import { SHARED_DEFAULT_CONFIG_PROPS } from '../constants'
import { defaultGetComposeService } from '../composeFileHelper'
import { ReadinessCheck } from '../../readiness-check/@types'
import { ShellCommandReadinessCheck } from '../../readiness-check/ShellCommandReadinessCheck'
import { AbstractRunner } from '../AbstractRunner'

interface RequiredConfigProps extends SharedRequiredConfigProps {}
interface DefaultableConfigProps extends SharedDefaultableConfigProps {
  password: string
  responsivenessTimeout: number
}
interface RedisRunnerConfig extends RequiredConfigProps, DefaultableConfigProps {}

const DEFAULT_PORT = 6379
const DEFAULT_CONFIG: DefaultableConfigProps = {
  ...SHARED_DEFAULT_CONFIG_PROPS,
  password: '',
  ports: [
    {
      published: DEFAULT_PORT,
      target: DEFAULT_PORT,
    },
  ],
  responsivenessTimeout: SHARED_DEFAULT_CONFIG_PROPS.responsivenessTimeout,
}

export class RedisReadinessCheck extends ShellCommandReadinessCheck {
  constructor({
    host,
    password,
    port = DEFAULT_PORT,
    timeout = 30,
  }: {
    host: string
    password: string
    port?: number
    timeout?: number
  }) {
    const redisCliPingOpts = ` \
      -h ${host} \
      -p ${port} \
      ${!!password ? `-a ${password}` : ''} \
      PING \
    `

    super({
      command: `redis-cli ${redisCliPingOpts}`,
      timeout,
    })
  }
}

class RedisRunner extends AbstractRunner {
  public static DEFAULT_HOST = SHARED_DEFAULT_CONFIG_PROPS.host
  public static DEFAULT_PORT = DEFAULT_PORT
  public containerId = ''
  public initializer = ''
  public runnerConfig: RedisRunnerConfig
  public logger: Logger
  public isBridgeNetworkMode = false
  public readinessChecks: Array<ReadinessCheck> = []

  public constructor(config: RequiredConfigProps & Partial<DefaultableConfigProps>) {
    super({
      ...DEFAULT_CONFIG,
      ...config,
    })
  }

  public mergeConfig({ ports, build, image, networks, ...composeService }: ComposeService) {
    this.runnerConfig = {
      ...this.runnerConfig,
      ...composeService,
      ...(image ? { image } : {}),
      ...(build ? { build } : {}),
      ...(ports ? { ports } : {}),
      ...(networks ? { networks: Object.keys(networks) } : {}),
    }

    this.readinessChecks.push(
      new RedisReadinessCheck({
        host: this.runnerConfig.host,
        password: this.runnerConfig.password,
        timeout: this.runnerConfig.responsivenessTimeout,
      }),
    )
  }

  public validateConfig() {
    const schema: { [key in keyof RequiredConfigProps]: any } = {
      service: validateTypes.isString,
    }
    validateConfig(schema, this.runnerConfig)
  }

  public getComposeService: GetComposeService = () => defaultGetComposeService(this.runnerConfig)
}

export { RedisRunnerConfig }
export default RedisRunner
