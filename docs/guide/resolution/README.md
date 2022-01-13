---
group: 引导
level: 3
---

# 屏幕适配

玩法组件相对一般UI组件库来说有些区别，其更注重元素件**相对位置**以及更注重**动画**

所以玩法组件一般都使用绝对定位（`position: absolute`）来实现

而其中涉及到屏幕适配相关的也由为重要

## 设计分辨率

当前使用**750px**当做屏幕宽度来设计各种玩法组件

## 自适应屏幕

当前移动端涉及到屏幕自适应主要有`vw`和`rem`等方案，而为了让玩法组件能够适应各种情况，故所有玩法组件都会继承`Resolution.ts`。
该基类会提供为配置的样式数值增加单位的作用

# `Resolution.ts`

其提供了一些方法和属性

## 基本类型定义

```typescript
// 样式值定义
export type StyleValueType = string | number;
// 样式对象定义
export type StyleType = Record<string, StyleValueType>;
// 增加单位的方法
export type addUnitFuncType = (v: StyleValueType) => string;
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| forceUnitFunc | 自定义屏幕适配转换方法 | _addUnitFuncType_ | `undefined` |

## Methods
| 名称 | 入参 | 出参 | 说明 |
| --- | --- | --- | --- |
| addUnitFunc | _StyleValueType_ | _string_ | 单位转换方法（仅处理数字），优先使用`forceUnitFunc`，若未定义则按照`750=100vw`来转换 |
| addUnitForAll | _StyleType_ | _StyleType_ | 对样式对象中所有数字样式进行转换处理 |
