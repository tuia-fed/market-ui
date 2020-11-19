import {
  CSSProperties,
  PropType,
  FunctionalComponent,
  ref,
  computed
} from 'vue'
import MultiCubesWrap from './components/cubesWrap'
import CubesItem from './components/cubesItem'
import CubesItemRenderFunction from './components/cubesItem/render'
import { noop } from '../../shared/utils'
import {
  MultiCubesOptions,
  MultiCubesItemClick,
  MultiCubesOption
} from '../types'
import { createComponent } from './create'
import useRotate from './hooks'

/**
 * 宫格参数划分为四组：上，右，下，左
 * @param optionsArr 
 * @param rowNum 
 */
function getOptionsDevideArr(optionsArr : MultiCubesOptions,rowNum : number){
  return [
    optionsArr.slice(0, rowNum),
    optionsArr.slice(rowNum, rowNum * 2 - 2),
    optionsArr.slice(rowNum * 2 - 2, rowNum * 3 - 2),
    optionsArr.slice(rowNum * 3 - 2, rowNum * 4 - 4)
  ]
}

export default createComponent({
  MultiCubesWrap,
  CubesItem,
  useRotate,
  props: {
    // 宫格容器尺寸
    size: {
      type: Number,
      default: 0
    },
    // 宫格容器样式
    containerStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    // 宫格options
    options: {
      type: Array as PropType<MultiCubesOptions>,
      required: true
    },
    // 点击option
    onItemClick: {
      type: Function as PropType<MultiCubesItemClick>,
      default: noop
    },
    // 自定义option组件
    itemRender: {
      type: Function as PropType<FunctionalComponent<MultiCubesOption>>,
      default: (option: MultiCubesOption) => (
        <CubesItemRenderFunction {...option} />
      )
    },
    // 每排的宫格数
    rowNum: {
      type: Number,
      default: 5
    },
    // 当前高亮index
    activeIndex: {
      type: Number,
      required: true
    }
  },

  setup(props) {
    
    if(props.rowNum < 2){
      return ()=>(<div>ERROR: rowNum must greater than 1</div>)
    }

    const autoSize = ref(props.size)
    const containerStyle = computed(() => ({
      width: (props.size || autoSize.value) + 'px',
      height: (props.size || autoSize.value) + 'px',
      ...props.containerStyle
    }))

    const myRef = (el: any) => {
      if (autoSize.value === 0) {
        const rect = el.$el.parentNode.getBoundingClientRect()
        autoSize.value = rect.width
      }
    }
    // 每行宫格个数
    const rowNum = computed(() => {
      return props.rowNum
    })
    // 每宫格尺寸
    const cubeSize = computed(() => {
      return autoSize.value / rowNum.value
    })

    // 宫格参数
    const optionsArr = computed(() => {
      return props.options.map((item, i) => ({ ...item, optionIndex: i }))
    })

    // 宫格参数划分为四组：上，右，下，左
    const optionsDevideArr: any = computed(() => {
      return getOptionsDevideArr(optionsArr.value,rowNum.value)
    })

    // 每个方位的宫格的渲染函数
    function cubeItemsRender(data: MultiCubesOptions) {
      return data.map((item: MultiCubesOption) => (
        <CubesItem
          onClick={props.onItemClick}
          index={item.optionIndex as number}
          option={item}
          render={props.itemRender as any}
          activeIndex={props.activeIndex}
          cubeSize={cubeSize.value}
        />
      ))
    }

    return () => (
      <MultiCubesWrap
        containerStyle={containerStyle.value}
        rowNum={rowNum.value}
        cubeSize={cubeSize.value}
        ref={myRef}
        v-slots={{
          top: () => cubeItemsRender(optionsDevideArr.value[0]),
          right: () => cubeItemsRender(optionsDevideArr.value[1]),
          bottom: () => cubeItemsRender(optionsDevideArr.value[2]),
          left: () => cubeItemsRender(optionsDevideArr.value[3])
        }}
      ></MultiCubesWrap>
    )
  }
})
