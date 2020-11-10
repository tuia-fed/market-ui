import { computed, CSSProperties, defineComponent, PropType } from 'vue'

import styles from '../../styles'

export default defineComponent({
  props: {
    containerStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    rowNum: {
      type: Number,
      default: 0
    },
    cubeSize: {
      type: Number,
      default: 0
    }
  },

  setup(props, ctx) {
    const containerStyle = computed(() => ({
      ...props.containerStyle
    }))
    return () => (
      <div class={styles.outerWrap} style={containerStyle.value}>
        <div class={styles.topWrap} style={{ height: props.cubeSize + 'px'}}>{(ctx.slots.top as Function)()}</div>
        <div class={styles.rightWrap} style={{ width: props.cubeSize + 'px',height: (props.rowNum -2) * props.cubeSize  + 'px', top:props.cubeSize + 'px'}}>{(ctx.slots.right as Function)()}</div>
        <div class={styles.bottomWrap} style={{ height: props.cubeSize + 'px', top: (props.rowNum -1) * props.cubeSize + 'px' }}>{(ctx.slots.bottom as Function)()}</div>
        <div class={styles.leftWrap} style={{ width: props.cubeSize + 'px',height: (props.rowNum -2) * props.cubeSize  + 'px', top:props.cubeSize + 'px'}}>{(ctx.slots.left as Function)()}</div>
      </div>
    )
  }
})
