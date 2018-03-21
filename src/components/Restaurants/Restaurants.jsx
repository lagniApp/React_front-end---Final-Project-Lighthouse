import React from 'react'
import {Grid, Row, Col, PageHeader, Table, Navbar, Nav} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'
import { Modal, Form, Button, FormGroup, ControlLabel, FormControl, Checkbox  } from 'react-bootstrap'
import $ from 'jquery';
import Resource from '../../models/resource'
import Cookies from 'js-cookie';
import { instanceOf } from 'prop-types';
import CryptoJS from "crypto-js";

const RestaurantLogin = Resource('restaurants')

class Restaurant extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);

    this.state = {
      email: '',
      password: '',
      show: false,
      errors: "",
    };
  }
  onChange = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { email, password } = this.state;

    RestaurantLogin.create({ email, password })
      .then((result) => {
        if (!result.error) {
          let session = CryptoJS.AES.encrypt(result.id.toString(), 'secret key 123')
          let inFifteenMinutes = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
          Cookies.set('session', session, { path: '/restaurants', expires: inFifteenMinutes });
          window.location.href = `/restaurants/${result.id}`;
        } else {
          alert(result.error)
        }
      })
      .catch((errors) => this.setState({ errors: errors }))
  }

  handleHide() {
    this.setState({ show: false });
  }
  backMenu() {
    window.location.href = `/`
  }

  render() {

    return (
      <div>
        <Navbar style={{ maxWidth: '100%', width: '100%', backgroundColor: '#274076', marginBottom: 0, borderRadius: 5, borderColor: '#274076' }}>
          <Row style={{ marginLeft: 0, marginRigth: 0, maxWidth: '100%', width: '100%' }} className="show-grid">
            <Col className="text-center center-block" xs={18} lg={4} lgOffset={2} style={{}} align="center">
              <Nav style={{ width: "100%", paddingTop: "3%", paddingBottom: "3%" }}>
                <Button style={{ paddingTop: "2%", paddingBottom: "2%" }}
                        bsSize="large"
                        onClick={() => this.setState({ show: true })}
                >
                  <b style={{ fontSize: "1.5em" }}>Restaurant Login</b>
                </Button>
              </Nav>
            </Col>
            <Col className="text-center center-block" xs={18} lg={4} lgOffset={1} style={{}} align="center">
              <Nav style={{ width: "100%", paddingTop: "3%", paddingBottom: "3%" }}>
                <Button style={{ paddingTop: "2%", paddingBottom: "2%" }}
                        bsSize="large"
                        onClick={this.backMenu}
                >
                  <b style={{ fontSize: "1.5em" }}>Back to LagniApp</b>
                </Button>
              </Nav>
            </Col>
          </Row>
        </Navbar>
        <div className="admin-backg">
          <div class="modal-container" >
                <Modal 
                  
                  show={this.state.show}
                  onHide={this.handleHide}
                  container={this}
                  aria-labelledby="contained-modal-title"
                >

                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ fontSize: "1.2em" }}>
                    <Form horizontal id="loginForm">
                      <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                          Email
                        </Col>
                        <Col sm={10}>
                      <FormControl name='email' type="email" placeholder="Email" onChange={this.onChange}/>
                        </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                          Password
                        </Col>
                        <Col sm={10}>
                      <FormControl name='password' type="password" placeholder="Password" onChange={this.onChange} />
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <Col smOffset={2} sm={10}>
                          <Button type="submit" onClick={this.onSubmit}>Sign in</Button>
                        </Col>
                      </FormGroup>
                    </Form> 
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleHide}>Close</Button>
                  </Modal.Footer>
                </Modal>
          </div>
        </div>
      </div>
    )
  }
}

export default Restaurant;