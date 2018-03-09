import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'


class Coupon extends React.Component {

  render() {
    return (
      <div>
      <div>------</div>
      {/*<div>{this.props.coupon.description}</div>*/}
      <div>{JSON.stringify(this.props.coupon)}</div>
      </div>
    )
  }
}

export default Coupon