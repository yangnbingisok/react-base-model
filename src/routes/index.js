import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import BasicLayout from '../layouts/BasicLayout'
import Editor from '../containers/Editor'

const LayoutRoute = ({ component: Component, redirect, ...rest }) => {
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: redirect,
        }}
      />
    )
  }
  let LayoutComponent = BasicLayout

  return (
    <LayoutComponent>
      <Route {...rest} render={props => <Component {...props} />} />
    </LayoutComponent>
  )
}

export default function Routes() {
  return (
    <Switch>
      <LayoutRoute path="/" component={Editor} />
    </Switch>
  )
}
