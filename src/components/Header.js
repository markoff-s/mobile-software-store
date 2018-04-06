import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import Cfg from './UiUrlCfg'
import AuthenticationService from './AuthenticationService'

export default class Header extends Component {
  constructor (props) {
    super(props)

    this.cfg = new Cfg()
    this.authSvc = new AuthenticationService()
  }

  render () {
    const isLoggedIn = this.authSvc.isLoggedIn()
    const signInText = !isLoggedIn ? 'Sign In' : 'Sign Out'
    const signInUrl = !isLoggedIn ? this.cfg.login() : this.cfg.logout()
    const user = !isLoggedIn ? '' : this.authSvc.getProfile().sub

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href={this.cfg.home()}>Mobile Software Store</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem href={this.cfg.home()}>
            Home
          </NavItem>
          <NavItem href={this.cfg.newApp()}>
            New
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem href="#">
            {user}
          </NavItem>
          <NavItem href={signInUrl}>
            {signInText}
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}
