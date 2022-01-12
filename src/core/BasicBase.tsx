import Resolution from './Resolution';
import StateConstant from '../constants/StateConstant';

export interface StateChangeDataType {
  now: StateConstant;
  pre: StateConstant;
}

export default Resolution.extend({
  extends: Resolution,
  data() {
    return {
      state: StateConstant.INIT,
    };
  },
  watch: {
    state(now, pre) {
      this.emitStateChange({ now, pre });
    },
  },
  methods: {
    getState() {
      return this.state;
    },
    // eslint-disable-next-line
    async start(opts?: any) {},
    // eslint-disable-next-line
    async stop(opts?: any) {},
    // eslint-disable-next-line
    async reset(opts?: any) {},
    // eslint-disable-next-line
    async disable(opts?: any) {},
    emitStateChange(opt: StateChangeDataType) {
      this.$emit('stateChange', opt);
    },
    // eslint-disable-next-line
    emitClickStart(opt: any) {
      this.$emit('clickStart', opt);
    },
  },
});
