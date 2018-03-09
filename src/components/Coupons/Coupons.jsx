import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'

// Client-side model
import Resource from '../../models/resource'
const RestaurantCoupons = Resource('/')


class Coupons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coupons: [],
      errors: null
    }
  }

  componentWillMount() {
    RestaurantCoupons.findAll() // RestaurantCoupon does the API fetching!
    .then((result) => this.setState({coupons: result.data, errors: null}))
    .catch((errors) => this.setState({errors: errors}))
  }


  render() {
    return (
      <div>
      <div>Coupons</div>
      {this.state.coupons.map((coupon, index) => {
        return <div> {coupon.name} </div>
      })}
      </div>
    )
  }
}

export default Coupons