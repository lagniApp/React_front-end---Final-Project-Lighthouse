import React from 'react'
import Restaurant from './Restaurant'
import { Doughnut, Radar } from 'react-chartjs-2'; 
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { Alert, Button, FormGroup, ControlLabel, FormControl, HelpBlock, render, FormExample, Radio, Popover, Checkbox } from 'react-bootstrap'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Statistic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total_quantity: 0,
            total_remaining: 0,
            total_used: 0,
            time: 0,
            tagsTotal: {},
            tagsUsed: {}
        }
        this.totalCouponsSold = this.totalCouponsSold.bind(this);
        this.totalPerTag = this.totalPerTag.bind(this);
    }

    totalCouponsSold() {
        let coupons = this.props.meets.results.couponsJSON
        let total_quantity = 0
        let total_remaining = 0
        let total_used = 0

        for (let i = 0; i < coupons.length; i++) {
            total_quantity += coupons[i].quantity
            total_remaining += coupons[i].remaining
            total_used += coupons[i].quantity - coupons[i].remaining
        }

        this.setState({
            total_quantity: total_quantity,
            total_remaining: total_remaining,
            total_used: total_used,
        })
    }

    totalPerTag() {
        let coupons = this.props.meets.results.couponsJSON
        let tagsTotal = {
            beer: 0,
            wine: 0,
            cocktail: 0,
            pizza: 0,
            pizza: 0,
            burrito: 0,
            hamburger: 0,
            pasta: 0,
            sushi: 0,
            steak: 0,
        }
        let tagsUsed = {
            beer: 0,
            wine: 0,
            cocktail: 0,
            pizza: 0,
            pizza: 0,
            burrito: 0,
            hamburger: 0,
            pasta: 0,
            sushi: 0,
            steak: 0,
        }


        for (let i = 0; i < coupons.length; i++) {
            for (let o = 0; o < coupons[i].tags.length; o++)
                switch (coupons[i].tags[o].cuisine) {
                    case "beer":
                        tagsTotal.beer += 1
                        tagsUsed.beer += (coupons[i].remaining / coupons[i].quantity)
                        break;
                    case "wine":
                        tagsTotal.wine += 1
                        tagsUsed.wine += (coupons[i].remaining / coupons[i].quantity)
                        break;
                    case "cocktail":
                        tagsTotal.cocktail += 1
                        tagsUsed.cocktail += (coupons[i].remaining / coupons[i].quantity)
                        break;
                    case "pizza":
                        tagsTotal.pizza += 1
                        tagsUsed.pizza += (coupons[i].remaining / coupons[i].quantity)
                        break;
                    case "burrito":
                        tagsTotal.burrito += 1
                        tagsUsed.burrito += (coupons[i].remaining / coupons[i].quantity)
                        break;
                    case "hamburger":
                        tagsTotal.hamburger += 1
                        tagsUsed.hamburger += (coupons[i].remaining / coupons[i].quantity)
                        break;
                    case "pasta":
                        tagsTotal.pasta += 1
                        tagsUsed.pastabeer += (coupons[i].remaining / coupons[i].quantity)
                        break;
                    case "sushi":
                        tagsTotal.sushi += 1
                        tagsUsed.sushi += (coupons[i].remaining / coupons[i].quantity)
                        break;
                    case "steak":
                        tagsTotal.steak += 1
                        tagsUsed.steak += (coupons[i].remaining / coupons[i].quantity)
                        break;
                    }
        }

        this.setState({
            tagsTotal: tagsTotal,
            tagsUsed: tagsUsed
        })
    }

    render() {
        const totalCouponsDoughnut = {
            labels: [
                'Total of coupons',
                'Total coupons remaning',
                'total coupons sold'
            ],
            datasets: [{
                data: [this.state.total_quantity, this.state.total_remaining, this.state.total_used],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        };

        const totalPerTag = {
            labels: ['beer', 'wine', 'cocktail', 'pizza', 'burrito', 'hamburger', 'pasta', 'sushi', 'steak'],
            datasets: [
                {
                    label: 'Total coupons per category',
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    
                    data: [
                        this.state.tagsTotal.beer, 
                        this.state.tagsTotal.wine, 
                        this.state.tagsTotal.cocktail, 
                        this.state.tagsTotal.pizza, 
                        this.state.tagsTotal.burrito, 
                        this.state.tagsTotal.hamburger, 
                        this.state.tagsTotal.pasta,
                        this.state.tagsTotal.sushi,
                        this.state.tagsTotal.steak
                    ]
                }, {
                    label: 'Total coupons USED per category',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data: [
                        Math.round(this.state.tagsUsed.beer),
                        Math.round(this.state.tagsUsed.wine),
                        Math.round(this.state.tagsUsed.cocktail),
                        Math.round(this.state.tagsUsed.pizza),
                        Math.round(this.state.tagsUsed.burrito),
                        Math.round(this.state.tagsUsed.hamburger),
                        Math.round(this.state.tagsUsed.pasta),
                        Math.round(this.state.tagsUsed.sushi),
                        Math.round(this.state.tagsUsed.steak)
                    ]
                },
            ]
        };

        
        
        
        
        
        return (
            <div>
                <Button bsStyle="primary" onClick={this.totalCouponsSold} >Total coupons and total sold</Button>
                <Button bsStyle="primary" onClick={this.totalPerTag} >Total per category</Button>
                <div><Radar data={totalPerTag} /></div>
                <div><Doughnut data={totalCouponsDoughnut} /></div>
                
                {console.log(this.props)}
            </div>
        )
        





    }
}

export default Statistic