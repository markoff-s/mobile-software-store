import {get} from 'axios'
import Cfg from '../components/ApiUrlCfg'

export default class ApplicationService {
  constructor () {
    this.cfg = new Cfg()

    this.getTop = this.getTop.bind(this)
    this.getApplicationById = this.getApplicationById.bind(this)
    this.getApplicationsByCategoryId = this.getApplicationsByCategoryId.bind(this)
    // this.createApplication = this.createApplication.bind(this)
  }

  getTop (itemsNumber) {
    const url = this.cfg.applications() + '?&sort=numberOfDownloads&dir=desc&page=0&size=' + itemsNumber

    return get(url)
  }

  getApplicationById (appId) {
    const url = this.cfg.application(appId)

    return get(url)
  }

  getApplicationsByCategoryId (catId) {
    const url = this.cfg.applicationsByCategoryId(catId)

    return get(url)
  }

  // createApplication (categoryId, description, file) {
  //   // console.log(file)
  //   const url = this.cfg.appl
  //   const formData = new FormData()
  //   formData.append('categoryId', categoryId)
  //   formData.append('description', description)
  //   formData.append('file', file)
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data'
  //     }
  //   }
  //   return post(url, formData, config)
  // }
}
