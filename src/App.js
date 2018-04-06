import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import NewApplication from './pages/NewApplication'
import ApplicationDetails from './pages/ApplicationDetails'
import withAuth from './components/withAuth'
import Cfg from './components/UiUrlCfg'

export default class App extends Component {
  constructor (props) {
    super(props)

    const cfg = new Cfg()
    this.home = cfg.home()
    this.login = cfg.login()
    this.logout = cfg.logout()
    this.newApp = cfg.newApp()
    this.appDetails = cfg.appDetailsBase() + '/:appId'
  }

  render () {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path={this.home} component={Home} />
            <Route path={this.login} component={Login} />
            <Route path={this.logout} component={Logout} />
            <Route path={this.newApp} component={withAuth(NewApplication)} />
            <Route path={this.appDetails} component={ApplicationDetails} />
            <Route render={() => (<h2>404 Not found</h2>)} />
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  }
}
