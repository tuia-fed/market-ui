import { defineComponent } from 'vue'
import CardBag from 'packages/cardBag'

export default defineComponent({
  name: 'CardBag',

  setup() {
    /**
     * 点击按钮
     * @param index 卡包索引
     */
    const handleClk = (index: number) => {
      console.log('---->', index)
    }
    // 卡片样式
    const style = {
      width: 750,
      height: 806,
      cardWidth: 606,
      cardHeight: 806,
      cardImg:
        '//yun.tuisnake.com/tact/CardBag_plus/4d90773be54d7366dbbaf9df73db2ea1.png',
      cardBtnImg:
        '//yun.tuisnake.com/tact/CardBag_plus/a09e9b4d7aa84335b6af5f4c83ae5b00.png'
    }
    // 卡片数据
    const cardList = [{ isOpen: false }, { isOpen: false }, { isOpen: false }]
    return () => (
      <CardBag cardList={cardList} style={style} handleClk={handleClk} />
    )
  }
})
