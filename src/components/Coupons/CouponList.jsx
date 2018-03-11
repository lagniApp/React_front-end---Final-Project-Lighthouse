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
      errors: null,
      filterTags: [],
    }
  }

  toggleTag = coupons => {
    let filteredCoupons = [];
    for (let stateCoupon of this.state.coupons) {
      for (let tagCoupon of coupons) {
        (stateCoupon.id === tagCoupon.id ? stateCoupon = tagCoupon : stateCoupon )
      }
    filteredCoupons.push(stateCoupon);
    }
    this.setState({coupons: filteredCoupons, errors: null})
  }

  componentWillMount() {
    RestaurantCoupons.findAll() // RestaurantCoupon does the API fetching!
    .then((result) => {
      // add a filter property to a coupon
      for (let coupon of result) {
        coupon['filter'] = true;
      }
      this.setState({coupons: result, errors: null})
    })
    .catch((errors) => this.setState({errors: errors}))
  }

  render() {
    return (
      <div>
      <CouponNav coupons={this.state.coupons} toggleTag={this.toggleTag} />
      <div>Coupons</div>
      {this.state.coupons.map((coupon) => {
        if (coupon.filter) {
          return <Coupon coupon={coupon} key={coupon.id} />
        }
      })}
      </div>
    )
  }
}

export default CouponList