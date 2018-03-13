import React from 'react'
import {Modal, Button} from 'react-bootstrap'

import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";


class CouponModal extends React.Component {

 render() {
  const latitude = this.props.coupon.restaurant.latitude
  const longitude = this.props.coupon.restaurant.longitude
  // console.log(latitude)

  const marker = {lat: Number(latitude), lng: Number(longitude)}
  // console.log(marker)
  console.log('from coupon modal', this.props.currentLocation)


  const MyMapComponent = compose(
    withProps({

      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDvX7jqAvcXzJYJGdfJWHrljnKq2vlka-Q&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={12.5} defaultCenter={ marker }>
      {props.isMarkerShown && (
        <span>
        <Marker position={ marker } />
        <Marker position={ this.props.currentLocation } />
        </span>
      )}
    </GoogleMap>
  ));

    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Body>
            <h4>{this.props.coupon.restaurant.name}</h4>
            <hr />
            <p>address: {this.props.coupon.restaurant.address}</p>
            <p>phone: {this.props.coupon.restaurant.phone}</p>
            <p>email: {this.props.coupon.restaurant.email}</p>
            <MyMapComponent isMarkerShown />
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

