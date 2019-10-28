import { ReadinessCheck, ReadinessCheckResult } from './@types'
import { Runner } from '../runners/@types'
import execaWrapper from '../utils/execaWrapper'
import sleep from '../utils/sleep'

export class ShellCommandReadinessCheck implements ReadinessCheck {
  private command: string
  private timeout: number
  private isAborted: boolean

  constructor({ command, timeout = 30 }: { command: string; runInsideContainer?: boolean; timeout?: number }) {
    this.command = command
    this.timeout = timeout
    this.isAborted = false
  }

  public async start(runner: Runner) {
    let remainingTries = this.timeout
    while (remainingTries > 0) {
      if (this.isAborted) return ReadinessCheckResult.CANCEL
      try {
        await execaWrapper(`docker exec ${runner.containerId} ${this.command}`, runner)
        return ReadinessCheckResult.SUCCESS
      } catch (err) {
        remainingTries--
        await sleep(1000)
      }
    }

    return ReadinessCheckResult.TIMEOUT
  }

  public cancel() {
    this.isAborted = true
  }
}
