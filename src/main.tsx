import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ConfigProvider } from 'antd'
import 'antd/dist/antd.less'
import locale from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={locale}>
    <App />
  </ConfigProvider>)
