import execa from 'execa'
import { hasYarn } from '../common'
import { ora } from '../common/logger'

export async function installDependencies() {
  const spinner = ora('Install dependencies').start()
  try {
    const manager = hasYarn() ? 'yarn' : 'npm'

    await execa(manager, ['install', '--prod=false'], {
      stdio: 'inherit',
    })

    spinner.succeed('Install dependencies')
  } catch (err) {
    spinner.fail('Install dependencies')
    throw err
  }
}
