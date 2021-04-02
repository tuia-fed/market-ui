import { createComponent } from './create'
import { onMounted, reactive, PropType, CSSProperties } from 'vue'
import { noop } from '../../shared/utils'
import './main.less'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'

export default createComponent({
  props: {
    style: {
      type: Object,
      default: {
        width: {
          type: Number,
          default: 750
        },
        height: {
          type: Number,
          default: 806
        },
        cardWidth: {
          type: Number,
          default: 606
        },
        cardHeight: {
          type: Number,
          default: 806
        },
        cardImg: {
          type: String,
          default:
            '//yun.tuisnake.com/tact/CardBag_plus/4d90773be54d7366dbbaf9df73db2ea1.png'
        },
        cardBtnImg: {
          type: String,
          default:
            '//yun.tuisnake.com/tact/CardBag_plus/a09e9b4d7aa84335b6af5f4c83ae5b00.png'
        }
      }
    },
    handleClk: {
      type: Function as PropType<(index: number) => void>,
      default: noop
    },
    cardList: {
      type: Array,
      default: [{}, {}]
    }
  },

  setup(props) {
    const {
      width,
      height,
      cardWidth,
      cardHeight,
      cardImg,
      cardBtnImg
    } = props.style
    // 容器样式
    const containerStyle: CSSProperties = {
      width: width + 'px',
      height: height + 'px'
    }
    // 卡片样式
    const cardStyle: CSSProperties = {
      width: cardWidth + 'px',
      height: cardHeight + 'px',
      backgroundImage: `url(${cardImg})`
    }
    // 按钮样式
    const cardBtnStyle: CSSProperties = {
      backgroundImage: `url(${cardBtnImg})`
    }

    function init() {
      new Swiper('#cardBag .swiper-container', {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: props.cardList.length,
        autoplay: true,
        on: {
          progress: function(swiper: Swiper) {
            const slides = swiper.slides
            for (let i = 0; i < slides.length; i++) {
              const slide = slides.eq(i)
              const item: any = slides[i]
              const slideProgress = item.progress
              const translate = slideProgress * 100 + 'px'
              const scale = 1 - Math.abs(slideProgress) / 3
              const zIndex = 999 - Math.abs(Math.round(10 * slideProgress))
              slide.transform(
                'translateX(' + translate + ') scale(' + scale + ')'
              )
              slide.css('zIndex', zIndex)
              slide.css('opacity', 1)
              if (Math.abs(slideProgress) > 2) {
                slide.css('opacity', 0)
              }
            }
          },
          click: (swiper: Swiper, event: any) => {
            const which: any = event.which
            props.handleClk(which)
            console.log('which', event)
          }
        }
      })
    }

    onMounted(() => {
      init()
    })

    return () => (
      <>
        <div class="cardBag" id="cardBag">
          <div class="swiper-container" style={containerStyle}>
            <div class="swiper-wrapper">
              {props.cardList.map((item, index) => (
                <div class="swiper-slide card" style={cardStyle}>
                  <div class="card-btn" style={cardBtnStyle}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
})
