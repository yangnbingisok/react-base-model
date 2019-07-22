import React from 'react'
import { withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Routes from './routes'

const App = () => (
  <section className="app-container">
    <Routes />
  </section>
)

export default hot(module)(withRouter(App))
