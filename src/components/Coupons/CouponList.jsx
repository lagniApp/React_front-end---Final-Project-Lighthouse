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
      visibleCoupons: [],
      filters: [],
      currentLocation: {},
      isReady: false,
      search: '',
      userPhone: '',

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
    const { filters, coupons, search } = this.state;
    let visibleCoupons = [];

    if (filters.length === 0) {
      visibleCoupons = coupons;
      } else {
        visibleCoupons = coupons.filter((coupon) => {
          return coupon.tags.filter((tag) => {
            return filters.indexOf(tag.cuisine.toLowerCase()) !== -1;
          }).length > 0;
        })
      }
    
      if(search) {
        visibleCoupons = visibleCoupons.filter(
          (coupon) => {
            console.log("REST", coupon.restaurant)
            return coupon.restaurant.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
        )
      }
      
      this.setState({
        visibleCoupons: visibleCoupons
      })
    }

  componentWillMount() {
    RestaurantCoupons.findAll() 
      .then((result) => {
      // add a filter property to a coupon
      for (let coupon of result) {
        coupon['filter'] = true;
      }
      this.setState({coupons: result, visibleCoupons: result, errors: null})
    })
    .catch((errors) => this.setState({errors: errors}))
  }

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
          currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
          },
          isReady: true
        })
      })
    }
  }

  _handleSearchChange = (term) => {
    console.log("search", term)
    this.setState({search: term, errors: null,}, this.filterCoupons)
  }

  // _handlePhoneChange = (input) => {
  //   console.log("phone input", input)
  //   console.log("length", input.length)
    
  //   if(input.length == 11){
  //     this.setState({ userPhone: input })
  //     window.alert("enjoy your coupon")
  //   }else {
  //     window.alert("Phone number must be 11 characters")
  //   }
  //   console.log("STATE", this.state)
    
  // }

  _handleTwilioMessage = (data, phone) => {
    console.log("DATA NAME", data.restaurant.name)
    console.log("DATA DESCR", data.description)
    console.log("DATA ADDR", data.restaurant.address)
    console.log("PHONEXX", phone)
    if(phone.length == 11){
      this.setState({ userPhone: phone })
      window.alert("enjoy your coupon")
    }else {
      window.alert("Phone number must be 11 characters")
    }
    
  }



  render() {
    let filterRestaurant = this.props.search
    return (
      <div>
      <CouponNav coupons={this.state.visibleCoupons} 
        toggleTag={this.toggleTag} 
        search ={this.state.search} 
        onSearchChange={this._handleSearchChange}/>

      <div>Coupons</div>
      {this.state.visibleCoupons.map((coupon) => {

          return <Coupon coupon={coupon} key={coupon.id} 
                   handleShow={this.handleShow} 
                  //  onPhoneInput={this._handlePhoneChange} 
                   currentLocation={this.state.currentLocation} 
                   isReady={this.state.isReady}
                   twilioMessage={this._handleTwilioMessage}/>
      })}
      </div>
    )
  }
}

export default CouponList