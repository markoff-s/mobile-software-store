export default class ApiUrlCfg {
  domain () {
    return 'http://localhost:8080'
  }

  api () {
    return this.domain() + '/api'
  }

  applications () {
    return this.api() + '/applications'
  }

  application (appId) {
    return this.applications() + '/' + appId
  }

  applicationsByCategoryId (catId) {
    return this.categories() + '/' + catId + '/applications'
  }

  bigImageByAppId (appId) {
    return this.application(appId) + '/big-image'
  }

  archiveByAppId (appId) {
    return this.application(appId) + '/archive'
  }

  categories () {
    return this.api() + '/categories'
  }

  login () {
    return this.api() + '/authentication'
  }
}
