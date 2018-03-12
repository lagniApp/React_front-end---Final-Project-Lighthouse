import React from 'react'
import {Modal, Button} from 'react-bootstrap'


class CouponModal extends React.Component {

  render() {


    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Body>
            <h4>{this.props.coupon.restaurant.name}</h4>
            <hr />
            <p>address: {this.props.coupon.restaurant.address}</p>
            <p>phone: {this.props.coupon.restaurant.phone}</p>
            <p>email: {this.props.coupon.restaurant.email}</p>

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
