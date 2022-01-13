import Vue from 'vue';

type KeyframsType = {
  width: number;
  height: number;
  amount: number;
  column: number;
};

export default Vue.extend({
  name: 'mk-frames-player',

  props: {
    // 序列帧的cdn链接
    url: {
      type: String,
      validator(val) {
        return ['https://', 'http://', '//'].some((prefix) =>
          val.startsWith(prefix)
        );
      },
      required: true,
    },
    // 序列帧的总帧数
    amount: {
      type: Number,
      required: true,
    },
    // 序列帧的行数
    rows: {
      type: Number,
      required: true,
    },
    // 序列帧的列数
    columns: {
      type: Number,
      required: true,
    },
    // 帧动画播放时长,单位ms
    duration: {
      type: Number,
      default: 1000,
    },
    // 帧动画播放顺序，正序/倒序
    direction: {
      type: String,
      default: 'normal',
      validator(val) {
        return ['normal', 'reverse'].indexOf(val) !== -1;
      },
    },
    // 动画播放次数
    times: {
      type: String,
      default: '1',
    },
  },

  data: () => ({
    // 帧动画图片的原始尺寸
    framesSize: {
      width: 0,
      height: 0,
    },
    animationControl: false, // 用于控制帧动画播放
    framsVisible: false, // 控制元素的显示
    animationName: `frames-${Date.now()}`, // 唯一的动画名称,防止多个组件实例生成的名称冲突
    pause: false, // 动画是否暂停
  }),

  computed: {
    framesStyle() {
      const { width: totalWidth, height: totalHeight } = this.framesSize;
      const width = totalWidth / this.columns;
      const height = totalHeight / this.rows;
      const animationStyle = `${this.animationName} ${
        this.duration / 1000
      }s steps(1) ${this.pause ? 'paused' : 'running'} ${this.times} ${
        this.direction
      }`;
      return {
        width: width + 'px',
        height: height + 'px',
        backgroundImage: `url(${this.url})`,
        backgroundSize: `${totalWidth}px ${totalHeight}px`,
        animation: this.animationControl ? animationStyle : '',
      };
    },
  },

  watch: {
    framsVisible(newVal) {
      const framesPlayer = document.getElementById('framesPlayer');
      newVal
        ? framesPlayer?.classList.add('frames-block')
        : framesPlayer?.classList.remove('frames-block');
    },
  },

  methods: {
    // 播放帧动画
    play() {
      this.framsVisible = true;
      this.animationControl = true;
      this.pause = false;
      // 用setTimeout代替webkitAnimationEnd监听动画的结束
      // 主要是webkitAnimationEnd兼容性不好
      setTimeout(() => {
        this.animationControl = false;
        this.framsVisible = false;
        this.$emit('playEnd');
      }, this.duration);
    },
    pauses() {
      this.pause = true;
    },
    resumes() {
      this.pause = false;
    },
    // 模拟加载帧动画图片
    loadImage(url: string): Promise<{ width: number; height: number }> {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = (e) => {
          this.$emit('imageOnLoad', { element: image, url, e });
          const { width, height } = image;
          resolve({ width, height });
          // 销毁image元素
          image.parentNode?.removeChild(image);
        };
        image.onerror = (e) => {
          this.$emit('imageOnError', { element: image, url, e });
          reject(url);
        };
      });
    },
    // 动态生成全局style样式
    calculateAndStyleKeyframes() {
      const { width: totalWidth, height: totalHeight } = this.framesSize;
      // 1帧动画的宽/高
      const perUnitWidth = totalWidth / this.columns;
      const perUnitHeight = totalHeight / this.rows;
      // 生成的keyframe样式表
      const keyframeCss = this.keyframeGenerator({
        width: perUnitWidth,
        height: perUnitHeight,
        amount: this.amount,
        column: this.columns,
      });
      const styleEl = document.createElement('style');
      styleEl.textContent = keyframeCss;
      document.head.appendChild(styleEl);
    },
    // 计算对应的帧动画样式
    keyframeGenerator({ width, height, amount, column }: KeyframsType) {
      let outputHtml: string = '';
      outputHtml += `@keyframes ${this.animationName} {`;
      // 遍历生成每一帧的动画样式
      for (let i = 0; i < amount; i++) {
        const whichRow = Math.floor(i / column);
        const whichColumn = i % column;
        const percent = Number((i * (100 / (amount - 1))).toFixed(2)); // toFixed转化为string类型
        // 针对最后两帧单独处理
        if (i >= amount - 2) {
          outputHtml += `
            ${percent}% {
              background-position: -${width * whichColumn}px -${
            height * whichRow
          }px
              ${i === amount - 2 ? 'opacity: 1' : 'opacity: 0'}
            }
          `;
        } else {
          outputHtml += `
            ${percent}% {
              background-position: -${width * whichColumn}px -${
            height * whichRow
          }px
            }
          `;
        }
      }
      outputHtml += '}';
      return outputHtml;
    },
  },

  mounted() {
    // 用于动态计算cdn帧动画图片的原始尺寸
    this.loadImage(this.url).then((data) => {
      const { width, height } = data;
      this.framesSize.width = width;
      this.framesSize.height = height;
      this.calculateAndStyleKeyframes();
    });
  },

  render() {
    return (
      <div
        class="mk-frames-player"
        style={this.framesStyle}
        id="framesPlayer"
      ></div>
    );
  },
});
