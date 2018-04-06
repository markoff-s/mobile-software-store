import axios, { get } from 'axios'
import Cfg from '../components/ApiUrlCfg'

export default class CategoriesService {
  constructor () {
    this.cfg = new Cfg()

    this.getCategories = this.getCategories.bind(this)
  }

  getCategories () {
    const url = this.cfg.categories()

    return get(url)
  }
}
