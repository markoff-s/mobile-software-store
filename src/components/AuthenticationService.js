import decode from 'jwt-decode'
import Cfg from './ApiUrlCfg'
import { get, post } from 'axios'

export default class AuthenticationService {
  constructor () {
    this.cfg = new Cfg()

    this.fetch = this.fetch.bind(this)
    this.login = this.login.bind(this)
    this.getProfile = this.getProfile.bind(this)
    // this.getAuthorizationHeader = this.getAuthorizationHeader.bind(this)
  }

  login (username, password) {
    return post(this.cfg.login(), {
      username: username,
      password: password
    }).then(res => {
      this.setToken(res.data.token)
      return Promise.resolve(res)
    })
  }

  isLoggedIn () {
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token)
  }

  isTokenExpired (token) {
    try {
      const decoded = decode(token)
      if (decoded.exp < Date.now() / 1000) {
        return true
      } else { return false }
    } catch (err) {
      return false
    }
  }

  setToken (idToken) {
    localStorage.setItem('id_token', idToken)
  }

  getToken () {
    return localStorage.getItem('id_token')
  }

  logout () {
    localStorage.removeItem('id_token')
  }

  getProfile () {
    const token = this.getToken()
    return token == null ? '' : decode(this.getToken())
  }

  // getAuthorizationHeader () {
  //   const header = {
  //     'Authorization': 'Bearer ' + this.getToken()
  //   }

  //   return header
  // }

  fetch (url, options) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    if (this.isLoggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json())
  }

  _checkStatus (response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}
