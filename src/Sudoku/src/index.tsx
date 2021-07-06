import Vue, { VNode, PropType } from "vue";
import SudokuContainer from "./container";
import SudokuOption, { StyleObject } from "./options";

type OptionType = {
  image: string;
  index: number;
};

type OptionTypeList = Array<OptionType>;

// 将数组划分为上右下左四个部分
const devideOptions = (optionsList: OptionTypeList) => {
  const sortOptionsList = optionsList.sort((a, b) => a.index - b.index); // 按照index大小进行排序
  return (rowIndex: number) => {
    return [
      sortOptionsList.slice(0, rowIndex),
      sortOptionsList.slice(rowIndex, rowIndex * 2 - 2),
      sortOptionsList.slice(rowIndex * 2 - 2, rowIndex * 3 - 2),
      sortOptionsList.slice(rowIndex * 3 - 2, rowIndex * 4 - 4),
    ];
  };
};

// 对布局和奖品选项组件做整合
export default Vue.extend({
  name: "mk-sudoku",

  components: {
    SudokuContainer,
    SudokuOption,
  },

  data() {
    return {
      actionHeight: {},
    };
  },

  props: {
    // 当前高亮的选项索引
    activeIndex: {
      type: Number,
      required: true,
    },
    // 奖项
    options: {
      type: Array as PropType<OptionTypeList>,
      required: true,
    },
    // 容器边长
    radius: {
      type: Number,
      default: 300,
    },
    // 选项自定义渲染组件
    customItemRender: {
      type: Function,
    },
    // 容器单行的奖项个数
    rowsAmount: {
      type: Number,
      default: 3,
    },
    // 外部容器的样式
    containerStyle: {
      type: Object,
    },
  },

  computed: {
    fullContainerStyle(): StyleObject {
      return {
        width: `${this.radius}px`,
        height: `${this.radius}px`,
        margin: "0 auto",
        ...this.containerStyle,
      };
    },
    singleCubeSize(): number {
      return Math.floor(this.radius / this.rowsAmount);
    },
    cubeNum(): number {
      return Math.pow(this.rowsAmount, 2) - Math.pow(this.rowsAmount - 2, 2);
    },
  },

  methods: {
    handleItemClick(index: number) {
      this.$emit("itemClick", index);
    },
  },

  mounted() {
    this.$nextTick(() => {
      // 获取action操作区容器的高度
      const constainerEle = this.$refs.action;
      const rect = constainerEle.parentNode.getBoundingClientRect();
      this.actionHeight = { height: rect.height + "px" };
    });
  },

  render(): VNode {
    const optionRender = (list: OptionType[]) => {
      return list.map((item: OptionType) => {
        return (
          <SudokuOption
            originalIndex={item.index}
            image={item.image}
            itemRender={this.customItemRender}
            activeIndex={this.activeIndex}
            size={this.singleCubeSize}
            cubeNum={this.cubeNum}
            itemClick={this.handleItemClick}
          ></SudokuOption>
        );
      });
    };

    const devideOptionsArr = devideOptions(this.options)(this.rowsAmount);

    return (
      <SudokuContainer
        ref="container"
        containerStyle={this.fullContainerStyle}
        rowsAmount={this.rowsAmount}
        cubeSize={this.singleCubeSize}
      >
        <div slot="top" class="mk-sudoku-wrap__top">
          {optionRender(devideOptionsArr[0])}
        </div>
        <div slot="right" class="mk-sudoku-wrap__right">
          {optionRender(devideOptionsArr[1])}
        </div>
        <div slot="bottom" class="mk-sudoku-wrap__bottom">
          {optionRender(devideOptionsArr[2])}
        </div>
        <div slot="left" class="mk-sudoku-wrap__left">
          {optionRender(devideOptionsArr[3])}
        </div>
        <div
          slot="action"
          class="mk-sudoku-wrap__action"
          ref="action"
          style={this.actionHeight}
        >
          {this.$slots.default}
        </div>
      </SudokuContainer>
    );
  },
});
