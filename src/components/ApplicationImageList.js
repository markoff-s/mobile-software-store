import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import ApplicationImage from './ApplicationImage'

export default class ApplicationImageList extends Component {
  render () {
    const applications = this.props.applications
    if (!applications) return null

    return (
      <div id="appImgList">
        <Grid>
          <Row>
            {applications.map((app, index) => {
              return (
                <Col md={2} key={index} >
                  <ApplicationImage image={app.smallImage.image} appId={app.id} />
                </Col>)
            })}
          </Row>
        </Grid>
      </div>
    )
  }
}
