import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'
import {Modal, Button} from 'react-bootstrap'
import geolib from 'geolib'

import Coupon from './Coupon'
import CouponNav from './CouponNav'

// import images
import beer from '../../images/beer.png'
import wine from '../../images/wine-glass.png'
import cocktail from '../../images/cocktail.png'
import pizza from '../../images/pizza.png'
import burrito from '../../images/burrito.png'
import hamburger from '../../images/hamburger.png'
import pasta from '../../images/spaghetti.png'
import sushi from '../../images/sushi.png'
import steak from '../../images/steak.png'

// Client-side model
import Resource from '../../models/resource'
const RestaurantCoupons = Resource('')
const NewTwilio = Resource('messages')

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
      filterLoading: '',
      taglist: {'beer': beer, 'wine': wine, 'cocktail': cocktail, 'pizza': pizza,
        'burrito': burrito, 'hamburger' :hamburger, 'pasta': pasta, 'sushi': sushi, 'steak': steak}

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
          // console.log("REST", coupon.restaurant)
          return coupon.restaurant.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      )
    }
    this._sortByDistane(visibleCoupons)
    this.setState({
      visibleCoupons: visibleCoupons
    })
  }

  componentDidMount() {
    RestaurantCoupons.findAll()
      .then((result) => {

      this.setState({coupons: result, visibleCoupons: result, errors: null})
    })
    .catch((errors) => this.setState({errors: errors}))
    this._orderByDistance()
  }

  _orderByDistance = () => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // current location of user
        const coords = pos.coords;
        console.log('coords', coords)
        // call function to set each coupon arr to have restaurant distance value from user
        const couponsDistanceUpdate = this._calcDistance(this.state.coupons, coords)
        console.log(couponsDistanceUpdate)
        const visibleCouponsDistanceUpdate = this._calcDistance(this.state.visibleCoupons, coords)

        this._sortByDistane(visibleCouponsDistanceUpdate)
        console.log(visibleCouponsDistanceUpdate)
        this.setState({
          coupons: couponsDistanceUpdate,
          visibleCoupons: visibleCouponsDistanceUpdate,
          currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
          },
          isReady: true
        })
      })
    }
  }

  _calcDistance = (arr, geolocation) => {
    const newArr = arr.map((coupon) => {
      const restaurantCoordinates = {lat: Number(coupon.restaurant.latitude), lng: Number(coupon.restaurant.longitude)}
      const userCoordinates = {lat: geolocation.latitude, lng: geolocation.longitude}
      coupon['distance'] = geolib.getDistance(restaurantCoordinates, userCoordinates)
      return coupon
    })
    return newArr
  }

  _sortByDistane = (arr) => {
    arr.sort((a,b) => {
      return a.distance - b.distance
    });
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
      console.log("REMAINING", data.quantity)
      console.log("DATA", data)
      let messageData = {
        restName: data.restaurant.name,
        couponInfo: data.description,
        address: data.restaurant.address,
        phone: phone,
        id: data.id
      }
console.log("type", phone.type)
    // check coupon quantity is > 0 before they can make a request
    if(data.remaining > 0){
      if(phone.length == 11 && phone.match(/^\d+$/)){
        this.setState({ userPhone: phone })
        // send twilio message
        NewTwilio.create( { messageData } )
        .then((result) => {
          const updatedVisibleCoupons = this.state.visibleCoupons.map((coupon) => {
            if (coupon.id === data.id) {
              coupon.remaining ? coupon.remaining-- : coupon.remaining = 0;
            }
              return coupon
          })
          console.log("updatedVisibleCoupons", updatedVisibleCoupons)
          this.setState({visibleCoupons: updatedVisibleCoupons})
          // alert("Enjoy your coupon")
          // this.setState({ coupons: result, visibleCoupons: result, errors: null })
        })
        // .then(() => this.setState({ redirect: true }))
        .catch((errors) => this.setState({ errors: errors }))

      }else {
        alert("Input error: phone number must contain 11 digits only ex. 16471234455")
      }
    } else {
      // if quantity is = 0 then alert them they can't obtain anymore
      alert("Sorry, no more coupons available")
    }
  }

  _handleSearchLocation = (address) => {
    console.log('from handleSearchLocation', address)
    const coords = {latitude: address.lat, longitude: address.lng}

    const couponsDistanceUpdate = this._calcDistance(this.state.coupons, coords)
    const visibleCouponsDistanceUpdate = this._calcDistance(this.state.visibleCoupons, coords)
    // call function to set each coupon arr to have restaurant distance value from location search submit
    this._sortByDistane(visibleCouponsDistanceUpdate)

    this.setState({
      coupons: couponsDistanceUpdate,
      visibleCoupons: visibleCouponsDistanceUpdate,
      currentLocation: {
          lat: coords.latitude,
          lng: coords.longitude
      },
      isReady: true
    })


  }

  render() {

    let filterRestaurant = this.props.search

    const coupons =
      this.state.visibleCoupons.map((coupon) => {
        return <Coupon coupon={coupon} key={coupon.id}
                 handleShow={this.handleShow}
                 onPhoneInput={this._handlePhoneChange}
                 currentLocation={this.state.currentLocation}
                 isReady={this.state.isReady}
                 twilioMessage={this._handleTwilioMessage}
                 taglist={this.state.taglist}
                 />
        })

    return (
      <div>
      <CouponNav coupons={this.state.visibleCoupons}
        toggleTag={this.toggleTag}
        search ={this.state.search}
        onSearchChange={this._handleSearchChange}
        taglist={this.state.taglist}
        handleSearchLocation={this._handleSearchLocation}
        orderByDistance={this._orderByDistance}
        />
      <div>Coupons</div>
      {coupons}
      </div>
    )
  }
}

export default CouponList


