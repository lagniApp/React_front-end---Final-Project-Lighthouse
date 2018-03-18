import React from 'react'
import ReactDOM from "react-dom";
import {Modal, Button} from 'react-bootstrap'
import MyMapComponent from './MyMapComponent';

// icons
import MdDirectionsWalk from 'react-icons/lib/md/directions-walk'
import MdDriveEta from 'react-icons/lib/md/drive-eta'
import MdDirectionsTransit from 'react-icons/lib/md/directions-transit'
import MdDirectionsBike from 'react-icons/lib/md/directions-bike'


class CouponModal extends React.Component {
  render() {
    const latitude = this.props.coupon.restaurant.latitude
    const longitude = this.props.coupon.restaurant.longitude
    const marker = {lat: Number(latitude), lng: Number(longitude)}
    const markerStyle = {backgroundColor: "yellow", fontSize: "5px"}

    const url = `https://www.google.com/maps/dir/?api=1&origin=${this.props.currentLocation.lat},${this.props.currentLocation.lng}&destination=${latitude},${longitude}&travelmode=`

    let mapDirectionLinks = <div>
            <a href={url + "bicycling"} target="_blank">
              <MdDirectionsBike size={20}/>
            </a>
            <a href={url + "walking"} target="_blank">
              <MdDirectionsWalk size={20}/>
            </a>
            <a href={url + "transit"} target="_blank">
              <MdDirectionsTransit size={20}/>
            </a>
            <a href={url + "driving"} target="_blank">
              <MdDriveEta size={20}/>
            </a>
          </div>
    let linkOrNoLinks = ""
    // render google direction links if currentLocation is true
    this.props.isReady? linkOrNoLinks = mapDirectionLinks : linkOrNoLinks;

    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Body>
            <h4>{this.props.coupon.restaurant.name}</h4>
            <hr />
            <p>address: {this.props.coupon.restaurant.address}</p>
            <p>phone: {this.props.coupon.restaurant.phone}</p>
            <p>email: {this.props.coupon.restaurant.email}</p>
            {linkOrNoLinks}
            <MyMapComponent
              isMarkerShown marker={marker}
              markerStyle={markerStyle}
              coupon={this.props.coupon}
              currentLocation={this.props.currentLocation}
              isReady={this.props.isReady}/>          </Modal.Body>
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



