## 快速上手

本节将介绍如何在项目中使用 Marketing-UI

### 引入 Marketing-UI

你可以引入整个 Marketing-UI，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Marketing-UI

### 完整引入

在 main.js 中写入以下内容：

```javascript
import { createApp } from 'vue'
import MarketingUI from 'marketing-ui'
import 'marketing-ui/lib/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(MarketingUI)
app.mount('#app')
```

以上代码便完成了 Marketing-UI 的引入。需要注意的是，样式文件需要单独引入。

### 按需引入

可以通过以下的写法来按需加载组件

```javascript
import Wheel from 'marketing-ui/lib/wheel';
import 'marketing-ui/lib/wheel/style'; // 或者 marketing-ui/lib/wheel/style/css 加载 css 文件
```

如果你使用了 babel，那么可以使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 来进行按需加载。

将 .babelrc 修改为：

```json
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "marketing-ui",
        "style": true
      }
    ]
  ]
}
```

加入这个插件后，你可以仍然这么写：

```javascript
import { Wheel } from 'marketing-ui';
```

插件会帮你转换成 marketing-ui/lib/xxx 的写法。另外此插件配合 style 属性可以做到模块样式的按需自动加载。
