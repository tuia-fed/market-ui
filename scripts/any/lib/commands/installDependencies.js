"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDependencies = void 0;
const execa_1 = __importDefault(require("execa"));
const common_1 = require("../common");
const logger_1 = require("../common/logger");
async function installDependencies() {
    const spinner = logger_1.ora('Install dependencies').start();
    try {
        const manager = common_1.hasYarn() ? 'yarn' : 'npm';
        await execa_1.default(manager, ['install', '--prod=false'], {
            stdio: 'inherit',
        });
        spinner.succeed('Install dependencies');
    }
    catch (err) {
        spinner.fail('Install dependencies');
        throw err;
    }
}
exports.installDependencies = installDependencies;
