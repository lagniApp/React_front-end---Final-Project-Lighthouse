import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'
import {Modal, Button} from 'react-bootstrap'

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
      // show: false
      visibleCoupons: [],
      filters: [],
    }
  }

  toggleTag = (tag, state) => {
    const filters = [...this.state.filters];

    if (state === 'On') {
      this.setState({
        filters: filters.concat(tag),
      }, this.filterCoupons);
    } else {
      const filterIndex = filters.indexOf(tag);
      filters.splice(filterIndex, 1);
      this.setState({
        filters,
      }, this.filterCoupons);
    }
  }

  filterCoupons = () => {
    const { filters, coupons } = this.state;

    if (filters.length === 0) {
      this.setState({
        visibleCoupons: coupons,
      })
    } else {
      const visibleCoupons = coupons.filter((coupon) => {
        return coupon.tags.filter((tag) => {
          return filters.indexOf(tag.cuisine.toLowerCase()) !== -1;
        }).length > 0;
      })

      this.setState({ visibleCoupons });
    }

  }



  // toggleTag = coupons => {
    // console.log("COUPONS", coupons)
    // if (coupons.length == 0) {
    //   this.setState({visibleCoupons: this.state.coupons})
    // }
    // let filteredCoupons = [];
    // for (let stateCoupon of this.state.coupons) {
    //   for (let tagCoupon of coupons) {
        // (stateCoupon.id === tagCoupon.id ? stateCoupon = tagCoupon : stateCoupon )
        // this.setState({visibleCoupons: coupons })
      // }
  //   filteredCoupons.push(stateCoupon);
  //   }
  //   this.setState({coupons: filteredCoupons, errors: null})
  // }

  componentWillMount() {
    RestaurantCoupons.findAll() // RestaurantCoupon does the API fetching!
    .then((result) => {
      // add a filter property to a coupon
      for (let coupon of result) {
        coupon['filter'] = true;
      }
      this.setState({coupons: result, visibleCoupons: result, errors: null})
    })
    .catch((errors) => this.setState({errors: errors}))
  }

  render() {
    return (
      <div>
      <CouponNav coupons={this.state.visibleCoupons} toggleTag={this.toggleTag} />
      <div>Coupons</div>
      {this.state.visibleCoupons.map((coupon) => {

          return <Coupon coupon={coupon} key={coupon.id} handleShow={this.handleShow} />

      })}
      </div>
    )
  }
}
console.log('hsey')

export default CouponList