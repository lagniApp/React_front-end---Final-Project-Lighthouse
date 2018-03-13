import React from 'react'
import ReactDOM from "react-dom";
import {Modal, Button} from 'react-bootstrap'
// import { compose, withProps } from "recompose";

// const {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
// } = require("react-google-maps");
import MyMapComponent from './MyMapComponent';
// const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

class CouponModal extends React.Component {
  render() {
  const latitude = this.props.coupon.restaurant.latitude
  const longitude = this.props.coupon.restaurant.longitude

  const marker = {lat: Number(latitude), lng: Number(longitude)}
  const markerStyle = {backgroundColor: "yellow", fontSize: "5px"}
  console.log('CouponModal', this.props.currentLocation)
  // const MyMapComponent = compose(
  //   withProps({

  //     googleMapURL:
  //       "https://maps.googleapis.com/maps/api/js?key=AIzaSyDvX7jqAvcXzJYJGdfJWHrljnKq2vlka-Q&v=3.exp&libraries=geometry,drawing,places",
  //     loadingElement: <div style={{ height: `100%` }} />,
  //     containerElement: <div style={{ height: `400px` }} />,
  //     mapElement: <div style={{ height: `100%` }} />
  //   }),
  //   withScriptjs,
  //   withGoogleMap
  // )(props => (
  //   <GoogleMap defaultZoom={12.5} defaultCenter={ marker }>
  //     {props.isMarkerShown && (
  //       <span>
  //         <MarkerWithLabel
  //           position={ marker }
  //           labelAnchor={{x:0,y:0}}
  //           labelStyle={ markerStyle }>
  //           <div>{this.props.coupon.restaurant.name}</div>
  //         </MarkerWithLabel>
  //         <MarkerWithLabel
  //           position={ this.props.currentLocation }
  //           labelAnchor={{x:0,y:0}}
  //           labelStyle={markerStyle}>
  //           <div>Current Location</div>
  //         </MarkerWithLabel>
  //       </span>
  //     )}
  //   </GoogleMap>
  // ));

    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Body>
            <h4>{this.props.coupon.restaurant.name}</h4>
            <hr />
            <p>address: {this.props.coupon.restaurant.address}</p>
            <p>phone: {this.props.coupon.restaurant.phone}</p>
            <p>email: {this.props.coupon.restaurant.email}</p>
{/*            <MyMapComponent isMarkerShown marker={marker}
              markerStyle={markerStyle}
              coupon={this.props.coupon}
              currentLocation={this.props.currentLocation}/>*/}
              <MyMapComponent
                isMarkerShown marker={marker}
                markerStyle={markerStyle}
                coupon={this.props.coupon}
                currentLocation={this.props.currentLocation}
              />
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

