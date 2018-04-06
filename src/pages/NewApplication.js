import React, { Component } from 'react'
import axios, { post } from 'axios'
import { Button, Grid, Row, Col, SplitButton, MenuItem, FormGroup, FormControl, Alert } from 'react-bootstrap'

import CategoriesService from '../components/CategoriesService'
import ApplicationService from '../components/ApplicationService'
import AuthenticationService from '../components/AuthenticationService'
import UiCfg from '../components/UiUrlCfg'
import ApiCfg from '../components/ApiUrlCfg'

export default class NewApplication extends Component {
  constructor (props, context) {
    super(props, context)

    this.categoriesService = new CategoriesService()
    this.appService = new ApplicationService()
    this.authSvc = new AuthenticationService()
    this.uiCfg = new UiCfg()
    this.apiCfg = new ApiCfg()

    this.state = {
      file: null,
      categories: [],
      categoryListTitle: 'Application category',
      selectedCategoryId: 0,
      isFormValid: false,
      description: '',
      errorMessage: ''
    }
  }

  componentDidMount () {
    this.categoriesService.getCategories().then((response) => {
      this.setState({ categories: response.data })
    })
  }

  onFormSubmit () {
    this.fileUpload(this.state.file).then((response) => {
      // console.log(response)
      if (response.status === 201) {
        const appId = response.headers.location.split('/')[3]
        this.props.history.replace(this.uiCfg.appDetails(appId))
      }
    }).catch(err => {
      this.setState({ errorMessage: err.response.data.message })
    })
  }

  fileUpload (file) {
    // console.log(file)
    const url = this.apiCfg.applications()
    const formData = new FormData()
    formData.append('categoryId', this.state.selectedCategoryId)
    formData.append('description', this.state.description)
    formData.append('file', file)

    const token = this.authSvc.getToken()
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      }
    }

    return post(url, formData, config)
  }

  onMenuItemChanged (category) {
    this.setState({ categoryListTitle: category.name, selectedCategoryId: category.id })
  }

  onSelectedFileChange (e) {
    this.setState({ file: e.target.files[0] })
  }

  onDescriptionChange (e) {
    this.setState({ description: e.target.value })
  }

  render () {
    const categories = this.state.categories
    if (categories.length === 0) return null

    const isFormValid = this.state.selectedCategoryId > 0 && this.state.file != null
    const cssClass = this.state.errorMessage === '' ? 'displayNone' : ''

    return (
      <div id="divNewApp">
        <Grid>
          <Row>
            <Col md={6}>
              <FormGroup>
                <h1>New Application</h1>
              </FormGroup>
              <FormGroup className={cssClass}>
                <Alert bsStyle="warning">
                  {this.state.errorMessage}
                </Alert>
              </FormGroup>
              <FormGroup>
                <SplitButton
                  bsStyle="default"
                  title={this.state.categoryListTitle}
                  id="cats, selectedCategoryId: cat.id">
                  {categories.map((cat, index) => (
                    <MenuItem key={cat.id} onSelect={() => {
                      this.onMenuItemChanged(cat)
                    }}>{cat.name}</MenuItem>
                  ))}
                </SplitButton>
              </FormGroup>

              <FormGroup>
                <FormControl componentClass="textarea" placeholder="Application decription" onChange={(e) => this.onDescriptionChange(e)} />
              </FormGroup>

              <FormGroup>
                <FormControl
                  type="file"
                  label="File"
                  onChange={(e) => this.onSelectedFileChange(e)}
                />
              </FormGroup>

              <FormGroup>
                <Button bsStyle="primary" onClick={() => this.onFormSubmit()} disabled={!isFormValid}>Save</Button>&nbsp;
                <Button bsStyle="danger" href="/">Cancel</Button>
              </FormGroup>
            </Col>
          </Row>
        </Grid>
      </div>

    )
  }
}
