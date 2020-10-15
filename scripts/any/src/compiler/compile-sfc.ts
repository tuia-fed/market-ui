import * as compilerUtils from '@vue/component-compiler-utils'
import * as compiler from '@vue/compiler-sfc'
import * as compileDom from '@vue/compiler-dom'
import { outputFileSync, readFileSync, remove } from 'fs-extra'
import { SRC_DIR } from '../common/constant'
import { replaceExt } from '../common'
import { parse } from 'path'

function genComponentOptions(script: string) {
  return script.replace(/[\s]/, '')
}

function injectRender(script: string, render: string) {
  return script
}

// todo: 支持sfc的组件编译
export function compileSfc(filepath: string) {
  // 源码
  const source = readFileSync(filepath, 'utf-8')
  // 编译任务队列
  const task = [remove(filepath)]

  // 解析源码
  const { descriptor } = compiler.parse(source, {
    filename: filepath,
    sourceRoot: SRC_DIR
  })

  // 拿到物料
  const { template, script, styles } = descriptor

  //样式 是否使用了 Scoped
  const hasScoped = descriptor.styles.some(s => s.scoped)

  // compile js
  if (script) {
    task.push(
      new Promise((resolve, reject) => {
        // 脚本内容
        let content = script.content

        if (template) {
          const render = compileDom.compile(template?.content)
          content = injectRender(content, render.code)
          outputFileSync(
            replaceExt(filepath, '.json'),
            JSON.stringify(descriptor, null, 2)
          )
          resolve()
        }
      })
    )
  }

  return Promise.all(task)
}
