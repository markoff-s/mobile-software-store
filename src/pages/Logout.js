import React, { Component } from 'react'
import AuthenticationService from '../components/AuthenticationService'

export default class Login extends Component {
  constructor () {
    super()

    this.authSvc = new AuthenticationService()
  }

  componentWillMount () {
    this.authSvc.logout()
    this.props.history.replace('/')
  }

  render () {
    return null
  }
}
