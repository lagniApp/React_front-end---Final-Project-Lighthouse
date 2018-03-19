import React from 'react'
// import {Row, Col, PageHeader, Table} from 'react-bootstrap'
// import {Route, Switch, Link} from 'react-router-dom'

import CouponModal from './CouponModal'
import PhoneModal from './PhoneModal'

class Coupon extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      phoneShow: false,
    }
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

    const distance = this.props.isReady? <div>Distance: {coupon.distance} meters</div> : <div></div>;

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
        <div className="restaurant-name"><h3> {coupon.restaurant.name} </h3></div>
        <div className="coupon-info"> {coupon.description} </div>
        <div>Coupons Left: {coupon.remaining}</div>
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

export default Coupon