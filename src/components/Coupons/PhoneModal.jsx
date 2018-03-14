import React from 'react'
import {Modal, Button} from 'react-bootstrap'


class PhoneModal extends React.Component {


  render() {
console.log("PROPS PHONE",this.props)

    return (
      <div>
        <Modal show={this.props.phoneShow} onHide={this.props.handlePhoneClose}>
        <Modal.Body>
            <h3>You will receive a text message of this coupon from {this.props.coupon.restaurant.name}, please enter your phone number below</h3>
    
    <input type="text" ref={(node) => {this.phoneInput = node}} />

    <button onClick={() => this.props.onPhoneInput(this.phoneInput.value)}>SUBMIT</button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.handlePhoneClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        </div>
    )
  }
}

export default PhoneModal
