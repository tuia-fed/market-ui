import { App, defineComponent, ComponentOptionsWithObjectProps } from 'vue'

function createComponent(name: string) {
  return function(sfc: ComponentOptionsWithObjectProps) {
    sfc.name = name
    sfc.install = (app: App) => {
      app.component(name, sfc)
    }

    return defineComponent(sfc)
  } as typeof defineComponent
}

function createClassname(name: string) {
  return (type: string) => name + '_' + type
}

export function createNamespace(name: string) {
  name = 'mk-' + name

  return [createComponent(name), createClassname(name)] as const
}
