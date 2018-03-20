import React from 'react'
import CouponModal from './CouponModal'
import PhoneModal from './PhoneModal'
import Resource from '../../models/resource'

const CouponId = Resource('coupons')
var ReactDOM = require('react-dom')

class SingleCoupon extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      phoneShow: false,
      couponId: this.props.match.params.id || null,
      restaurantId: this.props.match.params.restaurant_id,
      results: ""
    }
  }

  componentWillMount() {
    if(this.state.restaurantId) return
        CouponId.find(this.props.match.params.id)
            .then((result) => {
                this.setState({
                    results: result,
                    errors: null,
                    meets: result.meetups
                })
            })
            .catch ((errors) => this.setState({ errors: errors }))
}

  handleClose = () => {
    this.setState({ show: false });
  }

  handlePhoneClose = () => {
    this.setState({ phoneShow: false });
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handlePhoneShow = () => {
    this.setState({ phoneShow: true });
  }

  render() {

    const coupon = this.props.coupon

    const distance = this.props.isReady? <div className="coupon-distance">{coupon.distance} meters from you</div> : <div className="coupon-distance">calculating distance</div>;


    return (

      <div className="coupon-container">
        <div className="coupon-image-tags">
          {coupon.tags.map((tag) => {
            let img = tag.cuisine.toLowerCase()
            let style;
            for (const prop in this.props.taglist) {
              if (prop === img) {
                style = this.props.taglist[prop]
              }
            }
            return <img src={style} />
          })}
        </div>
        <div className="restaurant-name"> {coupon.restaurant.name} </div>
        <div className="coupon-info">       {coupon.description} </div>
        <div className="coupons-left"> {coupon.remaining} Coupons Remaining</div>
        {distance}
        <button type="button" onClick={this.handleShow} >Restaurant Info</button>
        <button type="button" onClick={this.handlePhoneShow}>Get Coupon</button>

        <CouponModal show={this.state.show}
          handleClose={this.handleClose}
          coupon={this.props.coupon}
          currentLocation={this.props.currentLocation}
          isReady={this.props.isReady}/>
        <PhoneModal phoneShow={this.state.phoneShow}
          handlePhoneClose={this.handlePhoneClose}
          coupon={this.props.coupon}
          onPhoneInput={this.props.onPhoneInput}
          twilioMessage={this.props.twilioMessage}/>
      </div>
    )
  }
}

export default SingleCoupon

