import { defineComponent, PropType, CSSProperties } from 'vue'
import styles from './index.module.less'

export default defineComponent({
  props: {
    backgroudStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    bannerStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    mainStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    }
  },

  setup(props, { slots }) {
    const backgroudStyle: CSSProperties = {
      ...props.backgroudStyle
    }
    const mainStyle: CSSProperties = {
      ...props.mainStyle
    }
    const bannerStyle: CSSProperties = {
      ...props.bannerStyle
    }

    return () => (
      <div class={styles.preview} style={backgroudStyle}>
        <div class={styles.banner} style={bannerStyle}></div>
        <div class={styles.main} style={mainStyle}>
          {(slots.default as Function)()}
        </div>
      </div>
    )
  }
})
