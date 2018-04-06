import React, { Component } from 'react'
import { NavItem, Nav, Grid, Row, Col, Badge } from 'react-bootstrap'
import CategoriesList from '../components/CategoriesList'
import ApplicationImage from '../components/ApplicationImage'

import CategoriesService from '../components/CategoriesService'
import ApplicationService from '../components/ApplicationService'
import Cfg from '../components/UiUrlCfg'

class Home extends Component {
  constructor () {
    super()

    this.categoriesService = new CategoriesService()
    this.appService = new ApplicationService()
    this.cfg = new Cfg()

    this.state = {
      activeCategoryId: 0,
      categories: [],
      applications: []
    }
  }

  componentDidMount () {
    this.categoriesService.getCategories().then((response) => {
      this.setState({ categories: response.data })

      var promise = new Promise(function (resolve, reject) {
        resolve({ categories: response.data })
      })
      return promise
    }).then((res) => {
      this.loadApplicationsByCategoryId(res.categories[0].id)
    })
  }

  loadApplicationsByCategoryId (catId) {
    this.appService.getApplicationsByCategoryId(catId).then((response) => {
      this.setState({ applications: response.data.content })
    })
  }

  render () {
    const categories = this.state.categories
    if (!categories) return null

    const applications = this.state.applications
    if (!applications) return null

    return (
      <div>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <CategoriesList categories={this.state.categories} onChange={(catId) => { this.loadApplicationsByCategoryId(catId) }} />
            </Col>
            <Col md={8} sm={8}>
              <Grid>
                {applications.map((app, index) => {
                  const appDetailsUrl = this.cfg.appDetails(app.id)

                  return (
                    <Row key={index}>
                      <Col md={2} >
                        <ApplicationImage image={app.smallImage.image} appId={app.id} />
                      </Col>
                      <Col>
                        <a href={appDetailsUrl}>
                          <h2>{app.name}</h2>
                        </a>
                        <p>Downloaded: <Badge>{app.numberOfDownloads}</Badge></p>
                      </Col>
                    </Row>
                  )
                })}
              </Grid>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Home
