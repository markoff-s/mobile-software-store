import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import ApplicationImage from './ApplicationImage'

export default class ApplicationsList extends Component {
  componentWillReceiveProps (props) {
    // alert(' ApplicationsList componentWillReceiveProps')
    console.log(props)
  }

  render () {
    // alert('ApplicationsList render')
    const applications = this.props.applications
    if (!applications) return null

    return (
      <div>
        <Grid>
          <Row>
            {applications.map((app, index) => {
              return (
                <Col md={2}>
                  <ApplicationImage key={index} image={app.smallImage.image} appId={app.id} />
                </Col>)
            })}
          </Row>
        </Grid>
      </div>
    )
  }
}
