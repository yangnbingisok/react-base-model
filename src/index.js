import 'core-js/es6/map'
import 'core-js/es6/set'
import 'core-js/es6/promise'
import 'normalize.css'
import './index.less'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import App from './App'
import models from '@/models'
import { createApp } from '@/utils/dva'
const dvaApp = createApp({
  initialState: {},
  models,
})
const store = dvaApp.getStore()

render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <HashRouter>
        <App />
      </HashRouter>
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
)
