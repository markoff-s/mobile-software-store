export default class UiUrlCfg {
  home () {
    return '/'
  }

  login () {
    return this.home() + 'login'
  }

  logout () {
    return this.home() + 'logout'
  }

  newApp () {
    return this.home() + 'new-app'
  }

  appDetailsBase () {
    return this.home() + 'app-details'
  }

  appDetails (appId) {
    return this.home() + 'app-details/' + appId
  }
}
