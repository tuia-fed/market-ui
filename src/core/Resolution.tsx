import Vue from 'vue';
// 错开Vue引入
import { PropType } from 'vue';
import { StyleValueType, StyleType } from 'types/Core';

type addUnitFuncType = (v: StyleValueType) => string;

const defaultAddUnitFunc: addUnitFuncType = (v: StyleValueType): string => {
  if (typeof v === 'number') {
    return `${v / 7.5}vw`;
  }
  return v;
};

export default Vue.extend({
  props: {
    forceUnitFunc: {
      type: Function as PropType<addUnitFuncType>,
      remark: '自定义屏幕适配转换方法',
    },
  },
  methods: {
    addUnitFunc(v: StyleValueType) {
      const func = this.forceUnitFunc || defaultAddUnitFunc;
      return func(v);
    },
    addUnitForAll(obj: StyleType): StyleType {
      const result = {} as StyleType;
      Object.keys(obj || {}).forEach((it) => {
        result[it] = this.addUnitFunc(obj[it]);
      });
      return result;
    },
  },
});
