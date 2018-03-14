import React from 'react'
import ReactDOM from "react-dom";
import {Modal, Button} from 'react-bootstrap'
import MyMapComponent from './MyMapComponent';

class CouponModal extends React.Component {
  render() {
  const latitude = this.props.coupon.restaurant.latitude
  const longitude = this.props.coupon.restaurant.longitude
  const marker = {lat: Number(latitude), lng: Number(longitude)}
  const markerStyle = {backgroundColor: "yellow", fontSize: "5px"}

    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Body>
            <h4>{this.props.coupon.restaurant.name}</h4>
            <hr />
            <p>address: {this.props.coupon.restaurant.address}</p>
            <p>phone: {this.props.coupon.restaurant.phone}</p>
            <p>email: {this.props.coupon.restaurant.email}</p>
            <MyMapComponent
              isMarkerShown marker={marker}
              markerStyle={markerStyle}
              coupon={this.props.coupon}
              currentLocation={this.props.currentLocation}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        </div>
    )
  }

  handleClose = () => {
    this.props.handleClose();
  }
}

export default CouponModal



