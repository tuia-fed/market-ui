import { App, defineComponent, ComponentOptionsWithObjectProps } from 'vue'

export function createComponent(name: string) {
  return function(sfc: ComponentOptionsWithObjectProps) {
    const upCaseName = name.charAt(0).toUpperCase() + name.slice(1)
    sfc.name = upCaseName
    sfc.install = (app: App) => {
      app.component(name, sfc)
    }

    return defineComponent(sfc)
  } as typeof defineComponent
}

export function createClassname(name: string) {
  return (type: string) => name + '_' + type
}

export function createNamespace(name: string) {
  // name = 'mk-' + name

  return {
    createComponent: createComponent(name),
    createClassname: createClassname('mk-' + name)
  }
}
