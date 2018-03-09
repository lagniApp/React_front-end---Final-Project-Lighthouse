import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'

// change routes later
// Client-side model
// import Resource from '../../models/resource'
// const Restaurant = Resource('/')


class Restaurant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {

  }

  render() {
    return (
      <div>Restaurant</div>
    )
  }
}

export default Restaurant