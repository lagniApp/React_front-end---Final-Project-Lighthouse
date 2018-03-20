import React from 'react'
import {Grid, Row, Col, PageHeader, Table, Navbar, Nav} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'
import { Modal, Form, Button, FormGroup, ControlLabel, FormControl, Checkbox  } from 'react-bootstrap'
import $ from 'jquery';
// Client-side model
import Resource from '../../models/resource'
import Cookies from 'js-cookie';
import { instanceOf } from 'prop-types';
// import { withCookies, Cookies } from 'react-cookie';


const RestaurantList = Resource('restaurants')



class Restaurant extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);
    

    this.state = {
      show: false
    };
  }

  // componentWillMount() {
  //   const { cookies } = this.props;

  //   this.state = {
  //     show: false,
  //     name: cookies.get('userID') || ''
  //   };
  // }

  // static propTypes = {
  //   cookies: instanceOf(Cookies).isRequired
  // };


  handleHide() {
    this.setState({ show: false });
  }

  handleLogin() {
    $("#loginForm").submit(function (e) {
      e.preventDefault(); 
      // alert("jquery")

      var url = "http://localhost:8080/restaurants"; 

      $.ajax({
        type: "POST",
        url: url,
        data: $("#loginForm").serialize(), 
        success: function (data) {
          // debugger
          // alert(data)
          // console.log(data)
          // if (data.username) {
          if (!data.error) {
            // const { cookies } = this.props;
            Cookies.set('userID', data.id, { path: '/restaurants' });
            //  && Cookies.get('userID') === data.id 
            console.log(data);
            window.location.href = `/restaurants/${data.id}`;
            // this.setState({ currentRestaurant: data.username });
          } else {
            $("#loginForm").closest('form').find("input[type=email]").val("");
            $("#loginForm").closest('form').find("input[type=password]").val("");
            alert(data.error)
          }
        },
        error: function(response){
          // debugger
          console.log(response)}
      });
      // e.preventDefault(); 
    });
  }

  // componentWillMount() {

  // }



  render() {

    return (
      <div>
        <Navbar style={{ marginBottom: 0, marginRigth: 0, maxWidth: '100%', width: '100%' }}>
          <Row style={{ marginLeft: 0, marginRigth: 0, maxWidth: '100%', width: '100%' }} className="show-grid">
            <Col class="text-center center-block" xs={18} lg={4} lgOffset={4} style={{}} align="center">
              <Nav style={{ width: "100%", paddingTop: "3%", paddingBottom: "3%" }}>
                <Button style={{ paddingTop: "3%", paddingBottom: "3%" }}
                        bsSize="large"
                        onClick={() => this.setState({ show: true })}
                >
                  <b style={{ fontSize: "1.5em" }}>RESTAURANT LOGIN</b>
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
                          <FormControl name='email' type="email" placeholder="Email"/>
                        </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                          Password
                        </Col>
                        <Col sm={10}>
                          <FormControl name='password' type="password" placeholder="Password" />
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <Col smOffset={2} sm={10}>
                          <Button type="submit" onClick={this.handleLogin}>Sign in</Button>
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
// export default Restaurant;