"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consola = exports.ora = exports.slimPath = void 0;
const ora_1 = __importDefault(require("ora"));
exports.ora = ora_1.default;
const chalk_1 = __importDefault(require("chalk"));
const consola_1 = __importDefault(require("consola"));
exports.consola = consola_1.default;
const constant_1 = require("../common/constant");
function slimPath(path) {
    return chalk_1.default.yellow(path.replace(constant_1.ROOT, ''));
}
exports.slimPath = slimPath;
