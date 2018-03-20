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
    // console.log("PROPS PHONE",this.props)

    const notPurchased = <div>
        <h3>You will receive a text message of this coupon from {this.props.coupon.restaurant.name}, please enter your phone number below</h3>
        <input type="text" ref={(node) => {this.phoneInput = node}} />
        <button onClick={() => {
          this.props.twilioMessage(this.props.coupon,this.phoneInput.value)
          this.setState({purchased: true})
          }
        }>
          SUBMIT
        </button>
      </div>

    const purchased = <h3>Enjoy your meal at {this.props.coupon.restaurant.name}</h3>

    return (
      <div>
        <Modal show={this.props.phoneShow} onHide={this.props.handlePhoneClose}>
          <Modal.Body>
            {this.state.purchased? purchased : notPurchased}
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
// this.props.onPhoneInput(this.phoneInput.value);