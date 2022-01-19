import BasicBase from './BasicBase';

export default BasicBase.extend({
  extends: BasicBase,
  methods: {
    getScopedSlot(name: string, data: any = {}) {
      const slot = this.$scopedSlots[name];
      return slot && slot(data);
    },
  },
});
