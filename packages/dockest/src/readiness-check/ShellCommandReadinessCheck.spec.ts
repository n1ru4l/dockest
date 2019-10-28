import { ShellCommandReadinessCheck } from './ShellCommandReadinessCheck'

it('can be created', () => {
  new ShellCommandReadinessCheck({ command: 'ls -al' })
})
