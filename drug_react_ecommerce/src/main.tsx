import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import routerList from '@/routes/routes.config'
import 'normalize.css/normalize.css'
import './styles/index.css'
import './styles/global.css'

import {
  RouterProvider,
} from "react-router-dom";

import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={routerList} />
    </ConfigProvider>
  </React.StrictMode>,
)
