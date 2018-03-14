import React from 'react'
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, render, FormExample, Radio, Checkbox } from 'react-bootstrap'

import Restaurant from './Restaurant'
import Resource from '../../../models/resource'
const NewCoupon = Resource('/restaurants/:id/coupons')

const RestaurantId = Resource('restaurants')

class CreateCoupons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurantId: (this.props.restaurantId || null),
            description: '',
            tags: {},
            quantity: 0,
            showCreate: false,
        };
        this.handleDescription = this.handleDescription.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.showCreate = this.showCreate.bind(this);
    }

    validationDescription() {
        const length = this.state.description.length;
        if (length > 10 && length < 125) return 'success';
        else if (length > 5 && length < 138) return 'warning';
        else if (length > 0 || length > 138) return 'error';
        return null;
    }

    handleCheckboxChange(event) {
        const target = event.target
        const checked = target.checked
        const name = target.name
        const newTags = { ...this.state.tags, [name]: checked }
        this.setState({
            tags: newTags
        });
    }

    handleDescription(e) {
        this.setState({ description: e.target.value });
    }

    handleQuantity(e) {
        this.setState({ quantity: e.target.value });
    }

    // NEED TO CHANGE HERE TO SUBMIT THE FORM TO THE DB!
    submitHandler = (e) => {
        e.preventDefault()
       console.log(this.state)
    //    const {} = this.state

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

                            <FormGroup>
                                <h4>Define the categories (tags) of the new coupon:</h4>
                                <Checkbox name="beer" onChange={this.handleCheckboxChange}>Beer</Checkbox>
                                <Checkbox name="wine" onChange={this.handleCheckboxChange}>Wine</Checkbox>
                                <Checkbox name="cocktail" onChange={this.handleCheckboxChange}>Cocktail</Checkbox>
                                <Checkbox name="pizza" onChange={this.handleCheckboxChange}>Pizza</Checkbox>
                                <Checkbox name="food" onChange={this.handleCheckboxChange}>Food</Checkbox>
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
                if(!this.state.showCreate) {
                    creating =
                    <div>
                        <p>
                        ID: {coupons.id}
                        </p>
                        <p>
                        DESCRIPTION: {coupons.description}
                        </p>
                        <p>
                        QUANTITY: {coupons.quantity}
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