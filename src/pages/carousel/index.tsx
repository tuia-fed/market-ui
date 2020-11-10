import { CSSProperties, defineComponent } from 'vue'
import Preview from '@/components/preview'
import Demo from './demo'
import Code from './README.md'

export default defineComponent({
  setup() {
    const bannerStyle: CSSProperties = {
      display: 'none'
    }

    const backgroundStyle: CSSProperties = {
      width: '660px'
    }

    const mainStyle: CSSProperties = {
      alignItems: 'center',
      flexDirection: 'column'
    }

    return () => (
      <>
        <Code />
        <Preview
          backgroudStyle={backgroundStyle}
          bannerStyle={bannerStyle}
          mainStyle={mainStyle}
        >
          <Demo />
        </Preview>
      </>
    )
  }
})
