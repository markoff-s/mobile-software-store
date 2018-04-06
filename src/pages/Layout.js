import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import ApplicationImageList from '../components/ApplicationImageList'
import Header from '../components/Header'
import ApplicationService from '../components/ApplicationService'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootswatch/cosmo/bootstrap.css'
import '../index.css'

export default class Layout extends Component {
  constructor (props) {
    super(props)
    this.appService = new ApplicationService()
    this.state = {
      applications: []
    }
  }

  componentDidMount () {
    this.appService.getTop(5).then((response) => {
      // console.log(response.data)
      this.setState({ applications: response.data.content })
    })
  }

  render () {
    return (
      <div>
        <Header />
        <ApplicationImageList applications={this.state.applications} />
        {this.props.children}
      </div>
    )
  }
}
