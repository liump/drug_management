import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css/normalize.css'
import './index.css'

import 'dayjs/locale/zh-cn.js'

import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'

import './styles/index.css'

import {
  RouterProvider,
} from "react-router-dom";
import router from './router/router.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <RouterProvider
        router={router}
      />
    </ConfigProvider>
  </React.StrictMode>,
)
