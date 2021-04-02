#!/usr/bin/env node
import { command, parse, version } from 'commander';
// @ts-ignore
import packageJson from '../package.json';
// commands
import { build } from './commands/build';

version(`@build/cli ${packageJson.version}`);

process.env.BUILD_CLI_VERSION = packageJson.version;

command('build')
  .description('Compile components in production mode')
  .option('--watch', 'Watch file change')
  .action(build);

parse();
