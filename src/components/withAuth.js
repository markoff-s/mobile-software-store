import React, { Component } from 'react'
import AuthService from './AuthenticationService'

export default function withAuth (AuthComponent) {
  const authSvc = new AuthService()

  return class AuthWrapped extends Component {
    constructor () {
      super()
      this.state = {
        user: null
      }
    }

    componentWillMount () {
      if (!authSvc.isLoggedIn()) {
        this.props.history.replace('/login')
      } else {
        try {
          const profile = authSvc.getProfile()
          this.setState({
            user: profile
          })
        } catch (err) {
          authSvc.logout()
          this.props.history.replace('/login')
        }
      }
    }

    render () {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        )
      } else {
        return null
      }
    }
  }
}
