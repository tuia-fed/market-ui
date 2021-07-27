const fs = require('fs-extra')
const inquirer = require('inquirer')
const path = require('path')
const chalk = require('chalk')

let existComponents = [] // 已存在的组件列表
let userCpt = {} // 用户的输入对象

let currentIndex = 0 // 当前已成功创建的文件数
const totalModelNum = 5 // 组件模板包含的总文件数量

// 组件模板地址和输出地址
const inputPath = `${__dirname}/template`
const outputPath = `${process.cwd()}/src`

const fsReaddir = (path) => {
  fs.readdir(path, 'utf-8', (err, data) => {
    if (err) {
      throw new Error(err)
    }
    existComponents = data.filter(item => (/^[A-Z]/).test(item))
    // 先校验是否重复创建，再初始化创建任务
    init()
  })
}

fsReaddir(outputPath)

/* 交互函数初始化 */
function init () {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: '组件英文名(每个单词的首字母必须大写，如Wheel)',
        validate (value) {
          const isRepeat = existComponents.includes(value) // 是否有想相同命名的组件
          if (isRepeat) return '该组件已被注册，请重新输入其他组件名'
          const isUpperCaseStart = value && (/^[A-Z]/).test(value)
          if (isUpperCaseStart) return true
          return '不能为空，且每个单词的首字母必须大写，如Wheel'
        }
      },
      {
        type: 'input',
        name: 'chinese',
        message: '组件中文名(10个字以内)',
        validate (value) {
          const isPass = value && value.length <= 10
          if (isPass) return true
          return '不能为空，且组件中文名不能超过10个字符'
        }
      },
      {
        type: 'input',
        name: 'description',
        message: '组件的功能描述(50个字以内)',
        validate (value) {
          const isPass = value && value.length <= 50
          if (isPass) return true
          return '不能为空，且描述不能超过50个字符'
        }
      },
      {
        type: 'list',
        name: 'sort',
        message: '组件所属分类(互动组件/基础组件)',
        choices: [
          {
            name: '互动组件',
            short: '互动',
            value: '互动组件'
          },
          {
            name: '基础组件',
            short: '基础',
            value: '基础组件'
          }
        ]
      }
    ]).then(answers => {
      userCpt = Object.assign(userCpt, answers)
      // 获取基础配置之后开始执行模板创建任务
      runTask()
    })
}

// 向文件中写入内容
const writeCodeController = (path, content, singleOutput) => {
  // 先判断singleOutput是否为目录下的文件地址，是则新建目录
  if ((/\//g).test(singleOutput)) {
    const folderName = singleOutput.split('/')[0]
    const folderPath = `${outputPath}/${userCpt.name}/${folderName}`
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, {
        recursive: true
      })
    }
  }
  fs.writeFile(path, content, (err) => {
    if (err) {
      throw new Error(err)
    }
    currentIndex += 1
    console.log(chalk.green(
      `${path} 创建成功`
    ))
    // 判断文件数量是否达到预期目标
    if (currentIndex >= totalModelNum) {
      console.log(chalk.cyan(
        `${userCpt.name} 组件模板已创建完成！开始快乐code之旅吧～`
      ))
    }
  })
}

// 根据模板内容创建新的文件
const createModel = (tpl, output, singleOutput) => {
  const { sort, chinese, name, description } = userCpt
  // 组件类名
  const classname = name.replace(/\B([A-Z])/g, "-$1").toLowerCase()
  // 读取模板文件内容
  fs.readFile(tpl, (err, res) => {
    if (err) {
      throw new Error(`${tpl}文件不存在`)
    }
    // 写入文件,且替换模板中的变量名
    const tplCode = res
      .toString()
      .replace(/{{sort}}/g, sort)
      .replace(/{{chinese}}/g, chinese)
      .replace(/{{component}}/g, name)
      .replace(/{{description}}/g, description)
      .replace(/{{classname}}/g, classname)
    writeCodeController(output, tplCode, singleOutput)
  })
}

// 需要动态创建文件的任务列表
const tasks = [
  {
    tpl: 'demo/index.md',
    output: 'demo/index.vue'
  },
  {
    tpl: 'src/tsx.md',
    output: 'src/index.tsx'
  },
  {
    tpl: 'less.md',
    output: 'index.less'
  },
  {
    tpl: 'ts.md',
    output: 'index.ts'
  },
  {
    tpl: 'readme.md',
    output: 'README.md'
  }
]

function runTask () {
  // 判断输出目录是否存在，不存在则动态创建
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, {
      recursive: true
    })
  }
  // 先创建对应的组件根目录
  fs.mkdirSync(`${outputPath}/${userCpt.name}`)
  // 循环创建组件的模板文件
  tasks.forEach(item => {
    // 读取模板然后写入对应的文件
    createModel(
      path.resolve(inputPath, item.tpl),
      path.resolve(`${outputPath}/${userCpt.name}`, item.output),
      item.output
    )
  })
}
