import { defineComponent } from 'vue'
import './index.less'
import { reactive } from 'vue'
export default defineComponent({
  name: 'MultiCubes',
  setup() {
    const state = reactive({
      activeIndex: 0,
      timeStep: 50,
      autoActiveTimer: 0,
      joinTimer: 0,
      count: 0,
      reducetimeStepFlag: true
    })

    function changeActiveIndex() {
      if (state.activeIndex === 7) {
        state.activeIndex = 0
      } else {
        state.activeIndex++
      }
    }

    function autoActive() {
      state.autoActiveTimer ? window.clearInterval(state.autoActiveTimer) : ''
      state.autoActiveTimer = window.setInterval(() => {
        changeActiveIndex()
      }, 180)
    }
    autoActive()

    function slowStop() {
      state.joinTimer = window.setTimeout(() => {
        if (state.count == 0) {
          window.clearTimeout(state.joinTimer)
        } else {
          state.count--
          if (state.timeStep > 20 && state.reducetimeStepFlag) {
            state.timeStep -= 5
          } else {
            state.reducetimeStepFlag = false
            state.timeStep += 20
          }
          changeActiveIndex()
          slowStop()
        }
      }, state.timeStep)
    }

    function start(finalIndex: number) {
      window.clearInterval(state.autoActiveTimer)
      state.joinTimer ? window.clearTimeout(state.joinTimer) : ''
      state.count = finalIndex - state.activeIndex + 32
      state.timeStep = 180
      state.reducetimeStepFlag = true
      slowStop()
    }

    // return {
    //   ...toRefs(state),
    //   start,
    //   autoActive
    // }
    return () => (
      <>
        <div class="nine-squared-wrap">
          <div class="top-squared-wrap">
             <span class={"squared-item" + (state.activeIndex * 1 === 0 ? " active" :"")} style="background-color: yellow;"> 1</span>
             <span class={"squared-item" + (state.activeIndex * 1 === 1 ? " active" :"")} style="background-color: green;"> 2 </span>
             <span class={"squared-item" + (state.activeIndex * 1 === 2 ? " active" :"")} style="background-color: yellow;"> 3 </span>
          </div>
          <div class="right-squared-wrap">
             <span class={"squared-item" + (state.activeIndex * 1 === 3 ? " active" :"")} style="background-color: green;">  4</span>
          </div>
          <div class="bottom-squared-wrap">
             <span class={"squared-item" + (state.activeIndex * 1 === 4 ? " active" :"")} style="background-color: yellow;"> 5 </span>
             <span class={"squared-item" + (state.activeIndex * 1 === 5 ? " active" :"")} style="background-color: green;"> 6 </span>
             <span class={"squared-item" + (state.activeIndex * 1 === 6 ? " active" :"")} style="background-color: yellow;"> 7 </span>
          </div>
          <div class="left-squared-wrap">
             <span class={"squared-item" + (state.activeIndex * 1 === 7 ? " active" :"")} style="background-color: green;"> 8 </span>
          </div>
          <div class="button" onClick={() => {start(7)}}>抽奖</div>
          <span class="active-circle"></span>
        </div>
        <button onClick={autoActive}>重置</button>
      </>
    )
  }
})
