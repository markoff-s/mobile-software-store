import React, { Component } from 'react'
import { Image, Button, Grid, Row, Col, Badge } from 'react-bootstrap'
import ApplicationService from '../components/ApplicationService'
import Cfg from '../components/ApiUrlCfg'

export default class ApplicationDetails extends Component {
  constructor (props) {
    super(props)

    this.cfg = new Cfg()
    this.appId = this.props.match.params.appId
    this.bigImageSrc = this.cfg.bigImageByAppId(this.appId)
    this.archiveSrc = this.cfg.archiveByAppId(this.appId)

    this.appService = new ApplicationService()
    this.state = {
      application: null
    }
  }

  componentDidMount () {
    this.appService.getApplicationById(this.appId).then((response) => {
      // console.log(response.data)
      this.setState({ application: response.data })
    })
  }

  render () {
    const imgSrc = this.bigImageSrc
    const app = this.state.application
    if (!imgSrc || !app) return null

    return (
      <div id="divAppDetails">
        <Grid>
          <Row>
            <Col md={6}>
              <Image src={imgSrc} className="big" />
              <h1>{app.name}</h1>
              <p>
                                Downloads: <Badge>{app.numberOfDownloads}</Badge>
              </p>
              <p>
                <Button bsStyle="primary" href={this.archiveSrc}>Download</Button>
              </p>
            </Col>

            <Col>
              <h1>Description</h1>
              <p>
                {app.description}
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
