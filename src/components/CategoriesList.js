import React, { Component } from 'react'
import { NavItem, Nav, Grid, Row, Col } from 'react-bootstrap'

export default class CategoriesList extends Component {
  constructor () {
    super()

    this.state = {
      activeCategory: 0
      // isInitialLoading: true
    }
  }

  // componentWillReceiveProps (props) {
  //   alert('componentWillReceiveProps')
  //   console.log(props)
  //   props.onChange(props.categories[this.state.activeCategory].id)
  // }

  render () {
    const categories = this.props.categories
    if (!categories) return null

    const activeCategory = this.state.activeCategory
    // if (this.state.isInitialLoading) {
    //   this.props.onChange(categories[activeCategory].id)
    //   // this.setState({isInitialLoading: false})
    // }
    // this.props.onChange(categories[activeCategory].id)

    return (
      <div>
        <h3>Categories</h3>
        <Nav
          bsStyle="pills"
          stacked
          activeKey={activeCategory}
          onSelect={index => {
            this.setState({ activeCategory: index })
            this.props.onChange(categories[index].id)
          }}
        >
          {categories.map((Category, index) => (
            <NavItem key={index} eventKey={index}>{Category.name}</NavItem>
          ))}
        </Nav>
      </div>
    )
  }
}
