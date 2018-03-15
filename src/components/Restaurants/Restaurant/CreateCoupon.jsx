import React from 'react'
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, render, FormExample, Radio, Checkbox } from 'react-bootstrap'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Restaurant from './Restaurant'
import Resource from '../../../models/resource'
const NewCoupon = Resource('restaurants/:id/coupons')

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
            erros: null,
            dropdownOpen: false,
            how_long: 0,

        };
        this.handleDescription = this.handleDescription.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.showCreate = this.showCreate.bind(this);
        this.handleHowLong = this.handleHowLong.bind(this);
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
        this.setState({ how_long: e.target.value });
    }


    submitHandler = (e) => {
        // e.preventDefault()
        const { restaurantId, description, tags, quantity, how_long } =  this.state;
        console.log("CREATE BUTTON", { restaurantId, description, tags, quantity, how_long })
        NewCoupon.create({ restaurantId, description, tags, quantity, how_long })
        .then((result) => {
            this.showCreate
        })
    }
        // .cath((erros) => this.setState({ erros: errors}))

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

                            <FormControl
                                type="number"
                                value={this.state.how_long}
                                placeholder="How long the coupons will be avaliable"
                                onChange={this.handleHowLong}
                            />
                            <HelpBlock>How long the coupon will be avaliable?</HelpBlock>


                            <FormGroup
                                validationState={this.validationDescription()} >
                                <h4>Define the categories (tags) of the new coupon:</h4>
                                <Checkbox name="Beer" onChange={this.handleCheckboxChange}>Beer</Checkbox>
                                <Checkbox name="Wine" onChange={this.handleCheckboxChange}>Wine</Checkbox>
                                <Checkbox name="Cocktail" onChange={this.handleCheckboxChange}>Cocktail</Checkbox>
                                <Checkbox name="Pizza" onChange={this.handleCheckboxChange}>Pizza</Checkbox>
                                <Checkbox name="Food" onChange={this.handleCheckboxChange}>Food</Checkbox>
                                <Checkbox name="Burrito" onChange={this.handleCheckboxChange}>Burrito</Checkbox>
                                <Checkbox name="Hamburger" onChange={this.handleCheckboxChange}>Hamburger</Checkbox>
                                <Checkbox name="Pasta" onChange={this.handleCheckboxChange}>Pasta</Checkbox>
                                <Checkbox name="Sushi" onChange={this.handleCheckboxChange}>Sushi</Checkbox>
                                <Checkbox name="Steak" onChange={this.handleCheckboxChange}>Steak</Checkbox>
                            </FormGroup>

                            <Button bsStyle="success" onClick={this.submitHandler}>Submit</Button>

                        </FormGroup>
                    </form>

            }
            let coupons = this.props.restaurant.results
                if(!this.state.showCreate) {
                    creating =
                    <div>
                        <p>
                            ID: {console.log(coupons.couponsJSON)}
                        </p>
                        <p>
                            {/* DESCRIPTION: {coupons.couponsJSON.description} */}
                        </p>
                        <p>
                            {/* QUANTITY: {coupons.couponsJSON.id} */}
                        </p>
                    </div>
                }
            
        return (
            <div>
                <Button bsStyle="info" onClick={this.showCreate} >Create new Coupon</Button>        
                { creating } 
            </div>
        )
    }
}

export default CreateCoupons