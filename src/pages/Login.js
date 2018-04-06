import React, { Component } from 'react'
import {
  Form, FormGroup, FormControl,
  Col, Button, ControlLabel, Alert, Grid, Row
} from 'react-bootstrap'
import AuthenticationService from '../components/AuthenticationService'

export default class Login extends Component {
  constructor () {
    super()

    this.state = {
      errorMessage: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.authSvc = new AuthenticationService()
  }

  componentWillMount () {
    if (this.authSvc.isLoggedIn()) { this.props.history.replace('/') }
  }

  render () {
    const cssClass = this.state.errorMessage === '' ? 'displayNone' : ''
    const isFormValid = this.state.username && this.state.password

    return (
      <Grid>
        <Row>
          <Col md={6}>
            <FormGroup className={cssClass}>
              <Alert bsStyle="warning">
                {this.state.errorMessage}
              </Alert>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col mdOffset={2} md={1} componentClass={ControlLabel}>
            Username
          </Col>
          <Col md={3}>
            <FormGroup>
              <FormControl type="text" name="username" placeholder="Username" required="true" onChange={this.handleChange} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col mdOffset={2} md={1} componentClass={ControlLabel}>
            Password
          </Col>
          <Col md={3}>
            <FormGroup>
              <FormControl type="password" name="password" placeholder="Password" required="true" onChange={this.handleChange} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col mdOffset={3} md={3}>
            <FormGroup>
              <Button bsStyle="primary" onClick={this.handleFormSubmit} disabled={!isFormValid}>Sign In</Button>&nbsp;
              <Button bsStyle="danger" href="/">Cancel</Button>
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    )
  }

  handleFormSubmit (e) {
    e.preventDefault()

    this.authSvc.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.replace('/')
      })
      .catch(err => {
        this.setState({ errorMessage: err.response.data })
      })
  }

  handleChange (e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }
}
