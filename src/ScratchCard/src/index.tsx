import Vue from "vue";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let events: string[];
let startMoveHandler: any;
let endMoveHandler: any;
let moveHandler: any;

export default Vue.extend({
  name: "mk-scratch-card",

  data: () => ({
    firstTouch: true, //是否第一次touchstart or mousedown
    showLucky: false, //显示隐藏抽奖结果
    supportTouch: false, //是否支持touch事件
    canvas,
    ctx,
    events, //touch事件 or mouse事件合集
    startMoveHandler, //touchstart or mousedown 事件
    endMoveHandler, //touchend or mouseend 事件
    moveHandler, //touchmove or mousemove 事件
    isSuspend: false,
  }),

  props: {
    moveRadius: {
      //刮刮范围
      type: Number,
      default: 20,
    },
    ratio: {
      //要求刮掉的面积占比，达到这个占比后，将会自动把其余区域清除
      type: Number,
      default: 0.3,
    },
    startCallback: {
      //第一次刮回调函数
      type: Function,
      default: () => {},
    },
    clearCallback: {
      //达到ratio占比后的回调函数
      type: Function,
      default: () => {},
    },
    coverColor: {
      //刮刮卡遮罩颜色
      type: String,
      default: "#C5C5C5",
    },
    coverImg: {
      //刮刮卡遮罩图片
      type: String,
    },
  },

  computed: {
    cardId() {
      return `card_${new Date().getTime()}`;
    },
  },

  render() {
    return (
      <div class="mk-scratch">
        <div class="mk-scratch_card" id={this.cardId}>
          <div class="mk-scratch_result">{this.$slots.default}</div>
          <canvas class="mk-scratch_canvas"></canvas>
        </div>
      </div>
    );
  },

  methods: {
    init() {
      const canvasWrap = document.getElementById(
        this.cardId
      ) as HTMLCanvasElement;
      this.canvas = canvasWrap.querySelector(
        ".mk-scratch_canvas"
      ) as HTMLCanvasElement;
      this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
      this.canvas.width = canvasWrap.clientWidth;
      this.canvas.height = canvasWrap.clientHeight;
      this.createCanvasStyle();
      this.bindEvent();
    },

    createCanvasStyle() {
      //当传入coverImg时，优先使用图片，否则使用颜色作为刮刮卡遮罩
      if (this.coverImg) {
        var coverImg = new Image();
        coverImg.src = this.coverImg;
        coverImg.onload = () => {
          this.ctx.drawImage(
            coverImg,
            0,
            0,
            this.canvas.width,
            this.canvas.height
          );
        };
      } else {
        this.ctx.fillStyle = this.coverColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
    },

    isSupportCanvas() {
      var elem = document.createElement("canvas");
      return !!(elem.getContext && elem.getContext("2d"));
    },

    bindEvent() {
      if ("ontouchstart" in window) this.supportTouch = true;
      this.events = this.supportTouch
        ? ["touchstart", "touchmove", "touchend"]
        : ["mousedown", "mousemove", "mouseup"];
      this.addEvent();
    },

    addEvent() {
      this.startMoveHandler = this.startEventHandler.bind(this);
      this.canvas.addEventListener(
        this.events[0],
        this.startMoveHandler,
        false
      );
    },

    startEventHandler: function (e: { preventDefault: () => void }) {
      e.preventDefault();
      if (this.isSuspend) return;
      if (this.firstTouch) {
        this.startCallback && this.startCallback();
        this.firstTouch = false;
      }
      this.moveHandler = this.moveEventHandler.bind(this);
      this.endMoveHandler = this.endEventHandler.bind(this);
      this.canvas.addEventListener(this.events[1], this.moveHandler, false);
      document.addEventListener(this.events[2], this.endMoveHandler, false);
    },

    moveEventHandler: function (e: {
      preventDefault: () => void;
      touches: any[];
      pageX: number;
      pageY: number;
    }) {
      e.preventDefault();

      e = this.supportTouch ? e.touches[0] : e;
      const canvasPos = this.canvas.getBoundingClientRect(),
        scrollT = document.documentElement.scrollTop || document.body.scrollTop,
        scrollL =
          document.documentElement.scrollLeft || document.body.scrollLeft,
        mouseX = e.pageX - canvasPos.left - scrollL,
        mouseY = e.pageY - canvasPos.top - scrollT;
      this.ctx.beginPath();
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.globalCompositeOperation = "destination-out";
      this.ctx.arc(mouseX, mouseY, this.moveRadius, 0, 2 * Math.PI);
      this.ctx.fill();
    },

    endEventHandler: function (e: { preventDefault: () => void }) {
      e.preventDefault();

      this.canvas.removeEventListener(this.events[1], this.moveHandler, false);
      document.removeEventListener(this.events[2], this.endMoveHandler, false);
      this.endMoveHandler = null;
      this.caleArea();
    },

    caleArea: function () {
      let pixels = this.ctx.getImageData(
          0,
          0,
          this.canvas.width,
          this.canvas.height
        ),
        transPixels = [];

      pixels.data.map((item, i) => {
        const pixel = pixels.data[i + 3];
        if (pixel === 0) {
          transPixels.push(pixel);
        }
        return item;
      });
      if (transPixels.length / pixels.data.length > this.ratio) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.removeEventListener(this.events[0], this.startMoveHandler);
        this.canvas.removeEventListener(
          this.events[1],
          this.moveHandler,
          false
        );
        document.removeEventListener(
          this.events[2],
          this.endMoveHandler,
          false
        );
        this.showLucky = true;
        this.clearCallback && this.clearCallback();
      }
    },

    changeStatus(suspend = true) {
      this.isSuspend = suspend;
    },

    reset() {
      this.canvas.removeEventListener(this.events[0], this.startMoveHandler);
      this.canvas.removeEventListener(this.events[1], this.moveHandler, false);
      document.removeEventListener(this.events[2], this.endMoveHandler, false);
      this.isSuspend = false;
      this.firstTouch = true;
      this.showLucky = false;
      this.$nextTick(() => {
        this.init();
      });
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
});
