(window["webpack4JsonpIsArray"]=window["webpack4JsonpIsArray"]||[]).push([["chunk-0ab7d554"],{2877:function(t,e,n){"use strict";function i(t,e,n,i,r,a,s,o){var c,u="function"===typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=n,u._compiled=!0),i&&(u.functional=!0),a&&(u._scopeId="data-v-"+a),s?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},u._ssrRegister=c):r&&(c=o?function(){r.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:r),c)if(u.functional){u._injectStyles=c;var l=u.render;u.render=function(t,e){return c.call(e),l(t,e)}}else{var m=u.beforeCreate;u.beforeCreate=m?[].concat(m,c):[c]}return{exports:t,options:u}}n.d(e,"a",(function(){return i}))},"4b17":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("div",{staticClass:"container"},[n("div",{staticClass:"wheel",style:t.wheelSize},[n("mk-wheel-3d",{ref:"wheel",attrs:{prizeList:t.prizeList},on:{stateChange:t.stateChange,clickStart:t.clickStart,prizeClick:t.prizeClick}}),n("div",{staticClass:"info"},[n("p",[t._v("当前状态："+t._s(t.state))]),n("p",[t._v("当前点击："+t._s(t.clickPrize))])])],1)]),n("demo-block",{attrs:{card:"",title:"基础操作"}},[n("button",{staticClass:"common-button primary",attrs:{disabled:!t.canStart},on:{click:t.clickStart}},[t._v(" 开始 ")]),n("button",{staticClass:"common-button primary",on:{click:t.reset}},[t._v("重置")]),n("button",{staticClass:"common-button primary",on:{click:t.disable}},[t._v("禁用")]),t._l(t.prizeList,(function(e,i){return n("button",{key:i,staticClass:"common-button primary",attrs:{disabled:!t.canStop},on:{click:function(e){return t.stop(i)}}},[t._v(" "+t._s(e.title)+" ")])}))],2)],1)},r=[],a=(n("d3b7"),n("e6cf"),n("96cf"),n("94dd"));function s(t,e,n,i,r,a,s){try{var o=t[a](s),c=o.value}catch(u){return void n(u)}o.done?e(c):Promise.resolve(c).then(i,r)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(i,r){var a=t.apply(e,n);function o(t){s(a,i,r,o,c,"next",t)}function c(t){s(a,i,r,o,c,"throw",t)}o(void 0)}))}}var c={data:function(){return{state:0,clickPrize:"",prizeList:[{title:"一等奖",image:"//yun.tuisnake.com/mami-media/img/50d7608a-ociowk8pm5.png"},{title:"二等奖",image:"//yun.tuisnake.com/mami-media/img/691aa62e-d5xwaga1hn.png"},{title:"三等奖",image:"//yun.tuisnake.com/h5-mami/couponPrize/lucky.png"},{title:"四等奖",image:"//yun.tuisnake.com/mami-media/img/8ecabe26-iq6wlrhpam.png"},{title:"五等奖",image:"//yun.tuisnake.com/mami-media/img/570a6594-vhcb3jmuz8.png"},{title:"谢谢参与",image:"//yun.tuisnake.com/h5-mami/couponPrize/thanks.png"}],wheelSize:{}}},computed:{canStart:function(){return this.state===a["a"].WAIT_START},canStop:function(){return this.state===a["a"].WAIT_END}},mounted:function(){var t=this.$refs.wheel.$el.style,e=t.width,n=t.height;this.wheelSize={width:e,height:n}},methods:{prizeClick:function(t){var e=t.item;this.clickPrize=e.title},stateChange:function(t){this.state=t.now},clickStart:function(){var t=this;return o(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.$refs.wheel,n.getState()===a["a"].WAIT_START){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,n.start();case 5:case"end":return e.stop()}}),e)})))()},stop:function(t){var e=this;return o(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$refs.wheel.stop({index:t});case 2:case"end":return n.stop()}}),n)})))()},reset:function(){var t=this;return o(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$refs.wheel.reset();case 2:case"end":return e.stop()}}),e)})))()},disable:function(){this.$refs.wheel.disable()}}},u=c,l=(n("b7da"),n("2877")),m=Object(l["a"])(u,i,r,!1,null,"345d4f4d",null);e["default"]=m.exports},7625:function(t,e,n){},b7da:function(t,e,n){"use strict";n("7625")}}]);