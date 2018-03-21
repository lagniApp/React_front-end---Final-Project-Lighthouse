import React from 'react'
import {Modal, Button} from 'react-bootstrap'


class PhoneModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      purchased: false
    }
  }

  render() {

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
      marginTop: "30px",
    };

    const styleTitle = {
      color: "#707070",
      fontSize: "4em",
      marginBottom: "10px",
      fontWeight: "bold"
    }

    const notPurchased = <div>
        <div style={styleTitle} className="text-center">Get Coupon</div>
        <div style={{fontSize: "2.5em", marginBottom: "20px"}} className="text-center">{this.props.coupon.restaurant.name}</div>
        <div className="text-center" style={{marginBottom: "10px", fontSize: "1.5em"}}>Please Enter Phone Number</div>
        <div className="text-center" style={{marginBottom: "5px", marginBottom: "35px"}}>
          <input style={{height: "30px", width: "150px"}} type="text" ref={(node) => {this.phoneInput = node}} />
          <button style={{backgroundColor: "#707070", color: "white", height: "30px", width: "80px"}}
            onClick={() => {
              this.props.twilioMessage(this.props.coupon,this.phoneInput.value)
              this.setState({purchased: true})
              }
            }>
            SUBMIT
          </button>
        </div>
      </div>

    const purchased = <h3 className="text-center" style={{margin: "20px", textDecoration: "underline"}}>Enjoy your meal at {this.props.coupon.restaurant.name}</h3>

    return (
      <div>
        <Modal show={this.props.phoneShow} onHide={this.props.handlePhoneClose} style={modalStyle} backdropStyle={backdropStyle}>
          <Modal.Body style={modalBody}>
            {this.state.purchased? purchased : notPurchased}
            <div className="container" style={{marginBottom: "5px", marginTop: "10px"}}>
              <div className="row justify-content-md-end">
                <button type="button" class="close" aria-label="Close" style={{marginRight: "5px"}} onClick={this.props.handlePhoneClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        </div>
    )
  }
}

export default PhoneModal
// this.props.onPhoneInput(this.phoneInput.value);