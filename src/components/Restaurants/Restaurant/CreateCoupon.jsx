import React from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { Alert, Button, FormGroup, ControlLabel, FormControl, HelpBlock, render, FormExample, Radio, Popover, Checkbox } from 'react-bootstrap'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Restaurant from './Restaurant'
import MeetUp from './MeetUp'
import Resource from '../../../models/resource'
const RestaurantId = Resource('restaurants')

class CreateCoupons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurantId: (this.props.restaurant.restaurantId || null),
            description: '',
            tags: {},
            quantity: 0,
            showCreate: false,
            errors: null,
            how_long: 1,
            delete: false

        };
        this.handleDescription = this.handleDescription.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.showCreate = this.showCreate.bind(this);
        this.handleHowLong = this.handleHowLong.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    validationDescription() {
        const length = this.state.description.length;
        if (length > 10 && length < 125) return 'success';
        else if (length > 5 && length < 138) return 'warning';
        else if (length > 0 || length > 138) return 'error';
        return null;
    }

    validationTags() {
        const length = this.state.tags.length;
        console.log(length)
        if (length >= 4) {
        }
        return null;
    }

    handleCheckboxChange(event) {
        const target = event.target
        const checked = target.checked
        const name = target.name
        const newTags = { ...this.state.tags, [name]: checked }
        this.setState({
            tags: newTags
        })
    }

    handleDescription(e) {
        this.setState({ description: e.target.value });
    }

    handleQuantity(e) {
        this.setState({ quantity: e.target.value });
    }

    handleHowLong(e) {
        console.log(e.target.value)
        this.setState({ how_long: e.target.value }, () => console.log(this.state.how_long))
    }


    submitHandler = (e) => {
        e.preventDefault()
        const { restaurantId, description, tags, quantity, how_long } = this.state;
        const NewCoupon = Resource(`restaurants/${this.state.restaurantId}/coupons`)
        console.log(this.state)
        NewCoupon.create({ restaurantId, description, tags, quantity, how_long })
            .then((result) => {
                if (result.message === "Coupon created") {
                    alert(result.message)
                } else {
                    alert(result.message)
                }
                this.setState({
                    showCreate: false
                })
                console.log(result.message)
            })
           }

    deleteHandler = (e) => {
        console.log("DELETE BUTTON, ID: ", e)
        const DeleteCoupon = Resource(`restaurants/${this.state.restaurantId}/coupons/${e}`)
        DeleteCoupon.destroy({ e })
            .then((result) => {
                alert(result.data.message)
            })
    }

    showCreate() {
        if (this.state.showCreate) {
            this.setState({
                showCreate: false
            })
        }
        if (!this.state.showCreate){
            this.setState({
                showCreate: true
            })
        }
    }

    render() {
        let creating = ""

        if (this.state.showCreate) {
            creating =
                <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.validationDescription()}>
                            <ControlLabel><h4>Create a new coupon:</h4></ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.description}
                                    placeholder="Description"
                                    onChange={this.handleDescription}
                                    maxLength="140"
                                />
                            <HelpBlock>Description of the promotion. At least 10 characteres and less than 140</HelpBlock>
                            <FormControl.Feedback />

                            <FormControl
                                type="integer"
                                value={this.state.quantity}
                                placeholder="Coupons avaliable"
                                onChange={this.handleQuantity}
                            />
                            <HelpBlock>Define how many coupons will be avaliable for this promotion</HelpBlock>

                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>How long the coupon will be avaliable?</ControlLabel>
                                <FormControl 
                                    componentClass="select" 
                                    placeholder="select" 
                                    // value={this.state.how_long}
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
                                validationState={this.validationDescription()} >
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

                        </FormGroup>
                    </form>

            }
            let coupons = this.props.restaurant.results.couponsJSON
            let arr = []
                if(!this.state.showCreate && coupons) {
                    for (let i = 0; i < coupons.length; i++){
                        arr.push(
                            <div key={i}>
                            <div><b>ID:</b>{coupons[i].id}</div>
                            <div><b>DESCRIPTION:</b>{coupons[i].description}</div>
                            <div><b>QUANTITY:</b>{coupons[i].quantity}</div>
                            <div><b>SOLD:</b>{coupons[i].quantity - coupons[i].remaining}</div>
                                <Button bsStyle="danger" onClick={() => this.deleteHandler(coupons[i].id)}>delete</Button>
                            <div> ------------------------------------------------------------------------------------------------------------------------------------------------- </div>
                        </div>
                        )
                    }
                }
            
        return (
            <div>
                <Button bsStyle="primary" onClick={this.showCreate} >Create new Coupon</Button>        
                { creating }
                <div>
                {arr.map((tag) => {
                    return tag
                })}
                </div>
            </div>
        )
    }
}

export default CreateCoupons