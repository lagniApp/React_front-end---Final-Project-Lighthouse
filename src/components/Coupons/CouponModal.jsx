import React from 'react'
import ReactDOM from "react-dom";
import {Modal, Button} from 'react-bootstrap'
import MyMapComponent from './MyMapComponent';

// icons
import MdDirectionsWalk from 'react-icons/lib/md/directions-walk'
import MdDriveEta from 'react-icons/lib/md/drive-eta'
import MdDirectionsTransit from 'react-icons/lib/md/directions-transit'
import MdDirectionsBike from 'react-icons/lib/md/directions-bike'
import MdLocationOn from 'react-icons/lib/md/location-on'
import MdLocalPhone from 'react-icons/lib/md/local-phone'
import MdEmail from 'react-icons/lib/md/email'

class CouponModal extends React.Component {
  render() {
    const latitude = this.props.coupon.restaurant.latitude
    const longitude = this.props.coupon.restaurant.longitude
    const marker = {lat: Number(latitude), lng: Number(longitude)}
    const markerStyle = {fontSize: "10px", fontWeight: "bold", borderStyle: "line", background: "rgba(255, 255, 255, 0.9)", padding: "5px", borderRadius: "10px"}
    const url = `https://www.google.com/maps/dir/?api=1&origin=${this.props.currentLocation.lat},${this.props.currentLocation.lng}&destination=${latitude},${longitude}&travelmode=`

    let mapDirectionLinks =
      <div className="container" style={{marginBottom: "15px"}}>
        <div className="row justify-content-md-end">
          <div>
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
        </div>
      </div>

    let linkOrNoLinks = ""
    // render google direction links if currentLocation is true
    this.props.isReady? linkOrNoLinks = mapDirectionLinks : linkOrNoLinks;

    // styles

    const backgroundColor = {
      backgroundColor: "#4285F4"
    }

    const tityleStyle = {
      color: "white",
    }

    const iconStyle = {
      color: "#4285F4",
      marginRight: "10px"
    }

    const modalStyle = {
      position: 'fixed',
      zIndex: 1040,
      top: 0, bottom: 0, left: 0, right: 0
    };

    const backdropStyle = {
      ...modalStyle,
      zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.5
    };

    const modalBody = {
      marginTop: "20px",
      fontSize: "1.1em"
    }

    const marginTopMap = {
      marginBottom: "15px"
    }

    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose} style={modalStyle} backdropStyle={backdropStyle}>
          <Modal.Header style={backgroundColor} >
            <h2 className="text-center" style={tityleStyle} >{this.props.coupon.restaurant.name}</h2>
          </Modal.Header>
          <Modal.Body style={modalBody} >
            <p><MdLocationOn size={20} style={iconStyle}/>{this.props.coupon.restaurant.address}</p>
            <p><MdLocalPhone size={20} style={iconStyle}/> {this.props.coupon.restaurant.phone}</p>
            <p style={marginTopMap}><MdEmail size={20} style={iconStyle}/> {this.props.coupon.restaurant.email}</p>
            {linkOrNoLinks}
            <MyMapComponent
              isMarkerShown marker={marker}
              markerStyle={markerStyle}
              coupon={this.props.coupon}
              currentLocation={this.props.currentLocation}
              isReady={this.props.isReady}
              style={{marginTop: "40px"}}/>

                  <div className="container" style={{marginBottom: "5px", marginTop: "10px"}}>
        <div className="row justify-content-md-end">
            <button type="button" class="close" aria-label="Close" onClick={this.props.handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
        </div>
          </Modal.Body>
        </Modal>
        </div>
    )
  }

  handleClose = () => {
    this.props.handleClose();
  }
}

export default CouponModal



