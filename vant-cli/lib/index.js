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
const build_1 = require("./commands/build");
commander_1.version(`@build/cli ${package_json_1.default.version}`);
process.env.BUILD_CLI_VERSION = package_json_1.default.version;
commander_1.command('build')
    .description('Compile components in production mode')
    .option('--watch', 'Watch file change')
    .action(build_1.build);
commander_1.parse();
