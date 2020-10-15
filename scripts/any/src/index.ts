#!/usr/bin/env node
import { command, parse, version } from 'commander'

// @ts-ignore
import pkg from '../package.json'

// commands
import { clean, buildVue, buildReact, buildSite, dev } from './commands'

version(`${pkg.name} ${pkg.version}`)

command('clean').description('Clean all dist files').action(clean)

// command('build')
//   .description('Compile components in production mode')
//   .option('--watch', 'Watch file change')
//   .action(build)

command('dev').description('Compile site in development mode').action(dev)

command('build-vue')
  .description('Compile components in production mode')
  .option('--watch', 'Watch file change')
  .action(buildVue)

command('build-react')
  .description('Compile components in production mode')
  .option('--watch', 'Watch file change')
  .action(buildReact)

command('build-site')
  .description('Compile site in production mode')
  .action(buildSite)

parse()
