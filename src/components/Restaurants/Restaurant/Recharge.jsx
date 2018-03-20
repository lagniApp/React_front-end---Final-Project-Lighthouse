import React from 'react'
import Restaurant from './Restaurant'
import { Doughnut, Radar } from 'react-chartjs-2';
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { Alert, Button, FormGroup, ControlLabel, FormControl, HelpBlock, render, FormExample, Radio, Popover, Checkbox } from 'react-bootstrap'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Stripe from './Stripe'
import StripeCheckout from 'react-stripe-checkout';


class Recharge extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recharge: false,
            restaurantId: (this.props.meets.restaurantId || null),
            amount: 0,
        }

    }
        onToken = (token) => {
            // Token -> card to charge
            // Amount -> amount to charge comes from input
            const amount = this.state.amount
            fetch(`http://localhost:8080/restaurants/${this.state.restaurantId}/charges`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    token,
                    amount

                })
            })
            .then(res => res.json())
            .then(response => {
                alert(`Status: ${response.status}, ${response.message}`);
            });
}

    handleRecharge = (e) => {
        e.preventDefault()
        this.setState({ amount: e.target.value });
    }

    submitRecharge = () => {
        console.log("CLICKED")
        this.setState({
            recharge: true
        })
    }

        render () {
            if (!this.state.recharge) {
                return (
                    <div className="charts-admin" style={{ maxWidth: '100%', width: '100%', borderRadius: "5px" }}>
                        {console.log(this.props)}
                        <form>
                            <FormGroup
                                controlId="formBasicText">
                                <ControlLabel><h4 style={{ paddingTop: 10, paddingLeft: 10 }}>RECHARGE AMOUNT:</h4></ControlLabel>
                                <HelpBlock>Amount to load </HelpBlock>
                                <FormControl
                                    type="currency"
                                    value={this.state.amount}
                                    placeholder="Amount"
                                    onChange={this.handleRecharge}
                                    style={{ width: "40%", marginLeft: 10}}
                                    maxLength="10"/>
                        <StripeCheckout
                            onClick={this.submitRecharge}
                            token={this.onToken}
                            stripeKey="pk_test_Gn7A7t8oWM48sDDpAlzeAfhY"
                        />
                                <FormControl.Feedback />
                            </FormGroup>
                        </form>
                    </div>
                )
        }
        }
}

    export default Recharge