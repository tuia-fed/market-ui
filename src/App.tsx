import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import Main from './components/main'
import Header from './components/header'
import Navbar from './components/navbar'
import Content from './components/content'

export default defineComponent({
  name: 'App',

  setup() {
    return () => (
      <>
        <Header />
        <Main>
          <Navbar />
          <Content>
            <RouterView />
          </Content>
        </Main>
      </>
    )
  }
})
