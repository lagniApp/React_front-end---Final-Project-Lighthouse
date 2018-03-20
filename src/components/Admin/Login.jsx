import React from 'react'
import Resource from '../../models/resource'
import Statistic from './Statistic'
import CreateRestaurant from './CreateRestaurant'
import AllRestaurants from './AllRestaurants'
// import AllRestaurants from './Dashboard'

import { Grid, Row, Col, PageHeader, Table } from 'react-bootstrap'
import { Route, Switch, Link } from 'react-router-dom'
import { Modal, Form, Button, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap'
import $ from 'jquery';
// Client-side model
import Cookies from 'js-cookie';
// import { withCookies, Cookies } from 'react-cookie';


const AdminLogin = Resource('admin/restaurants')



class Login extends React.Component {
    constructor(props, context) {
        super(props, context);

        // this.handleHide = this.handleHide.bind(this);


        this.state = {
            adminUser: '',
            password: '',
            redirect: false
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
    const { adminUser, password } = this.state;
    
    AdminLogin.create({ adminUser, password })
        .then((result) => {
            if (!result.error) {
                // const { cookies } = this.props;
                Cookies.set('AdminUser', 'admin', { path: '/AdminRestricted', expires: 1 } );
                window.location.href = `/AdminRestricted`;
            }        
        })
        .then(() => this.setState({ redirect: true }))
        .catch((errors) => this.setState({ errors: errors }))
}

    // componentWillMount() {

    // }



    render() {
        
        return (
            <div className="admin-backg">
                <Grid style={{ marginTop: '' }}>
                    <Row className="show-grid">
                        <Col xs={18} smOffset={2} lg={8} style={{ justifyContent: 'center', marginTop: '15%' }}>
                            <Form style={{ backgroundColor: 'white', borderRadius: '10px', padding: '5em' }}horizontal id="loginForm">
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        User
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl name='adminUser' type="text" placeholder="Username" onChange={this.onChange} />
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
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Login;

















