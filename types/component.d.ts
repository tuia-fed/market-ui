import Vue from 'vue'

export class MarketComponent {
  static name: string

  static install: (app: Vue) => any

  $props: Record<string, any>
}
