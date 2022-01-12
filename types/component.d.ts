import Vue from 'vue';

export class MarketComponent {
  static name: string;

  static install: (app: Vue) => any;

  $props: Record<string, any>;
}

declare module 'vue/types/options' {
  interface PropOptions {
    remark?: string;
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    install?: (v: VueConstructor) => void;
    Presets?: Record<string, any>;
  }
}
