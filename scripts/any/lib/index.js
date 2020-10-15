#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
// @ts-ignore
const package_json_1 = __importDefault(require("../package.json"));
// commands
const commands_1 = require("./commands");
commander_1.version(`${package_json_1.default.name} ${package_json_1.default.version}`);
commander_1.command('clean').description('Clean all dist files').action(commands_1.clean);
// command('build')
//   .description('Compile components in production mode')
//   .option('--watch', 'Watch file change')
//   .action(build)
commander_1.command('dev').description('Compile site in development mode').action(commands_1.dev);
commander_1.command('build-vue')
    .description('Compile components in production mode')
    .option('--watch', 'Watch file change')
    .action(commands_1.buildVue);
commander_1.command('build-react')
    .description('Compile components in production mode')
    .option('--watch', 'Watch file change')
    .action(commands_1.buildReact);
commander_1.command('build-site')
    .description('Compile site in production mode')
    .action(commands_1.buildSite);
commander_1.parse();
