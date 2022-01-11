import { PropOptions } from 'vue';

export default {
  Red: {
    containerImg: {
      type: String,
      remark: '容器图片',
      default: '//yun.tuisnake.com/market-ui/75062570-fa97-4155-9416-20b838415227.png',
    },
    rotatedomImg: {
      type: String,
      remark: '转盘图片（可转动部分）',
      default: '//yun.tuisnake.com/market-ui/2d44fefb-a255-4475-90fe-2ff3b96eea04.png',
    },
    pointImg: {
      type: String,
      remark: '箭头图片',
      default: '//yun.tuisnake.com/market-ui/7b9547b1-5696-4b2d-a609-046e9ed8956c.png',
    },
    btnImg: {
      type: String,
      remark: '按钮图片',
      default: '//yun.tuisnake.com/market-ui/af7401b9-239c-42ca-9860-18ad35095220.png',
    },
    btnDisableImg: {
      type: String,
      remark: '按钮不可用图片',
      default: '//yun.tuisnake.com/market-ui/56f54152-fefd-480e-b524-e1751ddf589f.png',
    },
    foundationImg: {
      type: String,
      remark: '底座图片',
      default: '//yun.tuisnake.com/market-ui/04d07f3b-87d1-4434-830b-70cbadbaf111.png',
    },
  },
  Yellow: {
    containerImg: {
      type: String,
      remark: '容器图片',
      default: '//yun.tuisnake.com/market-ui/f13b471e-1618-4a38-8fcd-c090e13a8f0e.png',
    },
    rotatedomImg: {
      type: String,
      remark: '转盘图片（可转动部分）',
      default: '//yun.tuisnake.com/market-ui/ba4ccea9-31ad-46c8-ab2b-63795495f513.png',
    },
    foundationImg: {
      type: String,
      remark: '底座图片',
      default: '//yun.tuisnake.com/market-ui/90039276-7458-4c67-a9af-4b6430d7225e.png',
    },
    extraRotate: {
      type: Number,
      remark: '初始转盘上奖品相对于转盘需要额外转动的度数',
      default: 30,
    },
  },
  Blue: {
    containerImg: {
      type: String,
      remark: '容器图片',
      default: '//yun.tuisnake.com/market-ui/b21463d3-fe79-47ac-8d0d-8a3ef64c28bf.png',
    },
    rotatedomImg: {
      type: String,
      remark: '转盘图片（可转动部分）',
      default: '//yun.tuisnake.com/market-ui/8bc57a0f-0090-4fbc-9505-75172cb7eae3.png',
    },
    foundationImg: {
      type: String,
      remark: '底座图片',
      default: '//yun.tuisnake.com/market-ui/a6c4e7e5-e9a1-471a-a8bc-c1995172ad99.png',
    },
    extraRotate: {
      type: Number,
      remark: '初始转盘上奖品相对于转盘需要额外转动的度数',
      default: 30,
    },
  },
  Green: {
    containerImg: {
      type: String,
      remark: '容器图片',
      default: '//yun.tuisnake.com/market-ui/1907e6d0-792e-432d-991b-94ac89599d71.png',
    },
    rotatedomImg: {
      type: String,
      remark: '转盘图片（可转动部分）',
      default: '//yun.tuisnake.com/market-ui/48227aa5-1def-4711-ba9d-365ae1eec9bc.png',
    },
    pointImg: {
      type: String,
      remark: '箭头图片',
      default: '//yun.tuisnake.com/market-ui/6cf7b8a6-ba54-432e-9ef6-961b7aad0de1.png',
    },
    btnImg: {
      type: String,
      remark: '按钮图片',
      default: '//yun.tuisnake.com/market-ui/4b39c513-624c-4174-a3ac-4733574042d9.png',
    },
    btnDisableImg: {
      type: String,
      remark: '按钮不可用图片',
      default: '//yun.tuisnake.com/market-ui/821c5285-4546-4448-a70f-c94de4385348.png',
    },
    foundationImg: {
      type: String,
      remark: '底座图片',
      default: '//yun.tuisnake.com/market-ui/79fe79e8-6a8c-4139-85fe-de36861c0cbb.png',
    },
    extraRotate: {
      type: Number,
      remark: '初始转盘上奖品相对于转盘需要额外转动的度数',
      default: 30,
    },
  },
} as Record<string, Record<string, PropOptions>>;
