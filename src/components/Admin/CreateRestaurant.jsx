import React from 'react'
import Dashboard from './Dashboard'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import Resource from '../../models/resource'
import { Col, Modal, Form, Button, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap'
const NewRestaurant = Resource('admin/restaurants')

class CreateRestaurant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            address: '',
            redirect: false
        }
        // this._onSubmitNew = this._onSubmitNew.bind(this);
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
        const { name, username, email, password, address, phone } = this.state;

        NewRestaurant.create( { name, username, email, password, address, phone } )
            .then((result) => {
                
                // alert(result.name)
                // this.setState({ coupons: result, visibleCoupons: result, errors: null })
            })
            .then(() => this.setState({ redirect: true }))
            .catch((errors) => this.setState({ errors: errors }))
    }

    
    
    // componentDidMount() {
    //     _onSubmitNew(data)
    //         NewRestaurant.create(data)
    //             .then((result) => {
    //                 alert("Get response!!!")
    //                 // this.setState({ coupons: result, visibleCoupons: result, errors: null })
    //             })
    //             .catch((errors) => this.setState({ errors: errors }))
        
    // }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/AdminRestricted' />;
        }
        return (
            <Form horizontal onSubmit={this.onSubmit}>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Name
                    </Col>
                    <Col sm={10}>
                        <FormControl name="name" type="text" placeholder="Restaurant Name" onChange={this.onChange}  />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Username
                    </Col>
                    <Col sm={10}>
                        <FormControl name="username" type="text" placeholder="Username" onChange={this.onChange}  />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl name="email" type="email" placeholder="Email" onChange={this.onChange}  />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl name="password" type="password" placeholder="Password" onChange={this.onChange}  />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Phone Number
                    </Col>
                    <Col sm={10}>
                        <FormControl name="phone" type="text" placeholder="19999999999" onChange={this.onChange} />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Address
                    </Col>
                    <Col sm={10}>
                        <FormControl name="address" type="text" placeholder="46 Spadina, Toronto" onChange={this.onChange} />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit"><b>CREATE RESTAURANT</b></Button>
                    </Col>
                </FormGroup>
            </Form>
        )





    }
}

export default CreateRestaurant