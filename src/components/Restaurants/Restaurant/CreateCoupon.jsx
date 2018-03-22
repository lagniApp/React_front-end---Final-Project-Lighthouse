import React from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, render, Modal, FormExample, Radio, Popover, Checkbox } from 'react-bootstrap'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Restaurant from './Restaurant'
import MeetUp from './MeetUp'
import Resource from '../../../models/resource'

require('react-s-alert/dist/s-alert-default.css');
require('react-s-alert/dist/s-alert-css-effects/slide.css');

const RestaurantId = Resource('restaurants')
var Alert = require('react-s-alert').default

class CreateCoupons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurantId: (this.props.restaurant.restaurantId || null),
            coupons: (this.props.restaurant.results.couponsJSON),
            description: '',
            tags: {},
            quantity: 0,
            showCreate: false,
            errors: "",
            how_long: 1,
        };
    }

    validationDescription = () => {
        const length = this.state.description.length;
        if (length > 10 && length < 125) return 'success';
        else if (length > 5 && length < 138) return 'warning';
        else if (length > 0 || length > 138) return 'error';
        return null;
    }

    validationTags = () => {
        const length = this.state.tags.length;
        console.log(length)
        if (length === 4) {
            alert("Limited of 4 tags per coupon")
        }
    }

    handleCheckboxChange = (event) => {
        const target = event.target
        const checked = target.checked
        const name = target.name
        const newTags = { ...this.state.tags, [name]: checked }
        this.setState({
            tags: newTags
        })
    }

    handleDescription = (e) => {
        this.setState({ description: e.target.value });
    }

    handleQuantity = (e) => {
        this.setState({ quantity: e.target.value });
    }

    handleHowLong = (e) => {
        this.setState({ how_long: e.target.value }, () => console.log(this.state.how_long))
    }

    submitHandler = (e) => {
        e.preventDefault()
        const { restaurantId, description, tags, quantity, how_long } = this.state;
        const newCoupon = Resource(`restaurants/${this.state.restaurantId}/coupons`)
        newCoupon.create({ restaurantId, description, tags, quantity, how_long })
            .then((result) => {
                this.setState({
                    errors: result.message,
                    showCreate: !this.state.showCreate
                })
                if (result.message === "Coupon created") {
                    this.props.updateRestaurant(result.coupon)
                    Alert.success('Coupon created with success', {
                        position: 'top-left',
                        effect: 'slide',
                    })
                } else if (result.message === "Not enough credit, please make a recharge") {
                    Alert.error('Not enough credit, please make a recharge', {
                        position: 'top-left',
                        effect: 'slide',
                    })
                } else if (result.message === "Not created, please check the fields") {
                    Alert.warning('Not created, please check the fields', {
                        position: 'top-left',
                        effect: 'slide',
                })}
        })
    }


    deleteHandler = (e) => {
        const DeleteCoupon = Resource(`restaurants/${this.state.restaurantId}/coupons/${e}`)
        DeleteCoupon.destroy({ e })
            .then((result) => {
                this.setState({ errors: result.data.message })
                if (result.data.message === "Deleted") {
                    Alert.success('Coupon deleted with success', {
                        position: 'top-left',
                        effect: 'slide',
                    })
                } else {
                    Alert.error('You exceeded the time limit of 10 minutes to delete a coupon', {
                        position: 'top-left',
                        effect: 'slide',
                    })
                }
            })
    }

    showCreate = () => {
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

    render = () => {
        let creating = ""

        if (this.state.showCreate) {
            creating =
                <form style={{ marginTop: 10 }}>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.validationDescription()}>
                    <ControlLabel><h4 style={{ color: "white", fontSize: "medium" }}>Create a new coupon:</h4></ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.description}
                            placeholder="Description"
                            onChange={this.handleDescription}
                            maxLength="140"
                            style={{ fontSize: "medium "}}
                        />
                        <HelpBlock style={{ color: "white", fontSize: "medium", paddingBottom: 30 }}>Description of the promotion. At least 10 characteres and less than 140</HelpBlock>
                        <FormControl.Feedback />

                        <FormControl
                            type="integer"
                            value={this.state.quantity}
                            placeholder="Coupons avaliable"
                            onChange={this.handleQuantity}
                            style={{ fontSize: "medium " }}
                        />
                    <HelpBlock style={{ color: "white", fontSize: "medium", paddingBottom: 30 }}>Define how many coupons will be avaliable for this promotion</HelpBlock>
                </FormGroup>


                    <FormGroup controlId="formControlsSelect" style={{ color: "white", fontSize: "medium" }}>
                        <ControlLabel style={{ color: "white", fontSize: "medium" }}>How long the coupon will be avaliable?</ControlLabel>
                            <FormControl 
                                componentClass="select" 
                                placeholder="select"
                                onChange={this.handleHowLong}>
                                    <option value="1">1 hour</option>
                                    <option value="2">2 hours</option>
                                    <option value="3">3 hours</option>
                                    <option value="4">4 hours</option>
                                    <option value="5">5 hours</option>
                                    <option value="6">6 hours</option>
                                    <option value="7">7 hours</option>
                                    <option value="8">8 hours</option>
                                    <option value="9">9 hours</option>
                                    <option value="10">10 hours</option>
                                    <option value="11">11 hours</option>
                                    <option value="12">12 hours</option>
                            </FormControl>
                    </FormGroup>
                    <FormGroup
                    validationState={this.validationTags()} style={{ color: "white", fontSize: "medium", paddingTop: 30 }}>
                            <h4>Define the categories (tags) of the new coupon:</h4>
                            <Checkbox name="beer" onChange={this.handleCheckboxChange}>Beer</Checkbox>
                            <Checkbox name="wine" onChange={this.handleCheckboxChange}>Wine</Checkbox>
                            <Checkbox name="cocktail" onChange={this.handleCheckboxChange}>Cocktail</Checkbox>
                            <Checkbox name="pizza" onChange={this.handleCheckboxChange}>Pizza</Checkbox>
                            <Checkbox name="burrito" onChange={this.handleCheckboxChange}>Burrito</Checkbox>
                            <Checkbox name="hamburger" onChange={this.handleCheckboxChange}>Hamburger</Checkbox>
                            <Checkbox name="pasta" onChange={this.handleCheckboxChange}>Pasta</Checkbox>
                            <Checkbox name="sushi" onChange={this.handleCheckboxChange}>Sushi</Checkbox>
                            <Checkbox name="steak" onChange={this.handleCheckboxChange}>Steak</Checkbox>
                    </FormGroup>
                            <Button bsStyle="success" onClick={this.submitHandler}>Submit</Button>
                    </form>
            }


            let coupons = this.props.restaurant.results.couponsJSON
            let arrExpired = []
            let arrValid = []
 
            if(!this.state.showCreate && coupons) {
                console.log(coupons)
                for (let i = 0; i < coupons.length; i++){
                    if (coupons[i] && coupons[i].expired === true) {
                        arrExpired.push(
                            <div class="panel panel-primary" style={{ marginTop: 10, borderRadius: "5px", backgroundColor: "#3d6382" }}>
                                <div class="panel-heading" style={{ backgroundColor: "#3d6382" }}>
                                    <div class="row">
                                        <div class="col-xs-3">
                                            <i class="fa fa-shopping-cart fa-5x"></i>
                                            <div style={{ color: "#FFCE56", fontSize: "x-large" }}>Expired</div>
                                        </div>
                                        <div class="col-xs-9 text-right">
                                            <div class="large" style={{ color: "white", fontSize: "large" }}><b>Total claimed: {coupons[i].quantity - coupons[i].remaining}</b></div>
                                            <div style={{ color: "white", fontSize: "medium" }} >Total of coupons: {coupons[i].quantity}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel-footer" style={{ color: "#274076", fontSize: "small" }}>
                                    <div style={{ color: "#274076", fontSize: "medium" }}>Details: {coupons[i].description}</div>
                                    <div>Creation time: {coupons[i].created_at.slice(0, 10)}
                                        <Button bsStyle="danger" style={{ float: 'right' }} onClick={() => this.deleteHandler(coupons[i].id)}>X</Button>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        )
                    } else {
                        arrValid.push(
                            <div class="panel panel-primary" style={{ marginTop: 10, borderRadius: "5px" }}>
                                <div class="panel-heading" style= {{ backgroundColor: "#3d6382" }}>
                                    <div class="row">
                                        <div class="col-xs-3">
                                            <i class="fa fa-shopping-cart fa-5x"></i>
                                            <div style={{ color: "white", fontSize: "x-large" }}>Valid</div>
                                        </div>
                                        <div class="col-xs-9 text-right">
                                            <div class="large" style={{ color: "white", fontSize: "large" }}><b>Total claimed: {coupons[i].quantity - coupons[i].remaining}</b></div>
                                            <div style={{ color: "white", fontSize: "medium" }} >Total of coupons: {coupons[i].quantity}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel-footer" style={{ color: "#274076", fontSize: "small" }}>
                                    <div tyle={{ color: "#274076", fontSize: "medium" }}>Details: {coupons[i].description}</div>
                                    <div>Creation time: {coupons[i].created_at.slice(0, 10)}
                                        <Button bsStyle="danger" style={{ float: 'right' }} onClick={() => this.deleteHandler(coupons[i].id)}>X</Button>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        )    
                    }
                }
                arrExpired = arrExpired.slice(0, 10)
                arrValid.reverse()
            }
        
        return (
            <div>
                
                <Button style={{ fontSize: "large", width: "100%", backgroundColor: "#FFCE56", borderRadius: "5px", color: "black" }} onClick={this.showCreate} >Create new Coupon</Button>        
                { creating }
                <div>
                    <Alert stack={false} />
                    {arrValid.map((tag) => {
                        return tag
                    })}
                </div>
                <div>
                    {arrExpired.map((tag) => {
                    return tag
                })}
                </div>
            </div>
        )
    }
}

export default CreateCoupons