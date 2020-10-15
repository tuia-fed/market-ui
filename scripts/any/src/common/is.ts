import { lstatSync } from 'fs-extra'
import { get } from 'lodash'
import { FRAMEWORk } from './constant'

export const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/
export const STYLE_REGEXP = /\.(css|less)$/
export const SFC_REGEXP = /\.(vue)$/

// 是否为文件夹
export function isDir(dir: string) {
  return lstatSync(dir).isDirectory()
}

// 是否为脚本文件
export function isScript(path: string) {
  return SCRIPT_REGEXP.test(path)
}

// 是否为样式文件
export function isStyle(path: string) {
  return STYLE_REGEXP.test(path)
}

// 是否为vue单文件组件
export function isSfc(path: string) {
  return SFC_REGEXP.test(path)
}

// 是否使用vue框架
export const isVue = FRAMEWORk === 'vue'

// 是否使用react框架
export const isReact = FRAMEWORk === 'react'
