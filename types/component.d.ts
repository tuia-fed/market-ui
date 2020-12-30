import { App } from 'vue'

export class MarketComponent {
  static name: string

  static install: (app: App) => any

  $props: Record<string, any>
}
