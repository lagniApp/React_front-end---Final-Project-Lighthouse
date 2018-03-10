import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'

import Coupon from './Coupon'
import CouponNav from './CouponNav'


// Client-side model
import Resource from '../../models/resource'
const RestaurantCoupons = Resource('')


class CouponList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coupons: [],
      errors: null
    }
  }

  componentWillMount() {
    RestaurantCoupons.findAll() // RestaurantCoupon does the API fetching!
    .then((result) => {
      this.setState({coupons: result, errors: null})
      console.log(result)
    })
    .catch((errors) => this.setState({errors: errors}))
  }

  render() {
    return (
      <div>
      <CouponNav />
      <div>Coupons</div>

      {this.state.coupons.map((coupon) => {
        return <Coupon coupon={coupon} />
      })}
      </div>
    )
  }
}

export default CouponList