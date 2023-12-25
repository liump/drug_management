import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'normalize.css/normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import echarts from '@/components/echarts/echarts'

import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(ElementPlus)
app.use(router)


// 定义全局方法
// app.config.globalProperties.$ls = () => {
//   console.log('这是我自定义的全局方法')
// }
app.config.globalProperties.$echarts = echarts

app.mount('#app')
