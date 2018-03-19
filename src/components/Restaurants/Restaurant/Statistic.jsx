import React from 'react'
import Restaurant from './Restaurant'
import { Bar, Doughnut, Radar } from 'react-chartjs-2'; 
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { Alert, Button, FormGroup, ControlLabel, FormControl, HelpBlock, render, FormExample, Radio, Popover, Checkbox } from 'react-bootstrap'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Statistic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            meet: this.props.meets.results.couponsJSON,
            total_quantity: 0,
            total_remaining: 0,
            total_used: 0,
            time: 0,
            tagsTotal: {},
            tagsUsed: {},
            time: '',
            month: {}
        }
    }

    totalPizza = () => {
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

    totalRadar = () => {
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

        for (let i = 0; i < coupons.length; i++) {
            for (let o = 0; o < coupons[i].tags.length; o++) {
                switch (coupons[i].tags[o].cuisine) {
                    case "beer":
                        tagsTotal.beer += 1
                        break;
                    case "wine":
                        tagsTotal.wine += 1
                        break;
                    case "cocktail":
                        tagsTotal.cocktail += 1
                        break;
                    case "pizza":
                        tagsTotal.pizza += 1
                        break;
                    case "burrito":
                        tagsTotal.burrito += 1
                        break;
                    case "hamburger":
                        tagsTotal.hamburger += 1
                        break;
                    case "pasta":
                        tagsTotal.pasta += 1
                        break;
                    case "sushi":
                        tagsTotal.sushi += 1
                        break;
                    case "steak":
                        tagsTotal.steak += 1
                        break;
                }
            }
        }

        this.setState({
            tagsTotal: tagsTotal,
        })
    }

    totalBars = () => {
        let coupons = this.props.meets.results.couponsJSON
        let month = {
            octused: 0,
            octtotal: 0,
            novused: 0,
            novtotal: 0,
            decused: 0,
            dectotal: 0,
            janused: 0,
            jantotal: 0,
            febused: 0,
            febtotal: 0,
            marused: 0,
            martotal: 0 
        }

        for (let i = 0; i < coupons.length; i++) {
            switch (coupons[i].expiration_time.slice(5, 7)) {
                case '10':
                    month.octtotal += coupons[i].quantity
                    month.octused += coupons[i].quantity - coupons[i].remaining
                    break;
                case '11':
                    month.novtotal += coupons[i].quantity
                    month.novused += coupons[i].quantity - coupons[i].remaining
                    break;
                case '12':
                    month.dectotal += coupons[i].quantity
                    month.decused += coupons[i].quantity - coupons[i].remaining
                    break;
                case '01':
                    month.jantotal += coupons[i].quantity
                    month.janused += coupons[i].quantity - coupons[i].remaining
                    break;
                case '02':
                    month.febtotal += coupons[i].quantity
                    month.febused += coupons[i].quantity - coupons[i].remaining
                    break;
                case '03':
                    month.martotal += coupons[i].quantity
                    month.marused += coupons[i].quantity - coupons[i].remaining
                    break;
                default:
                    break;
            }
        }

        this.setState({ month: month })
    }

    totalCouponsDoughnut = () => {
        return {
            labels: [
                'Total of coupons created',
                'Total coupons unclaimed',
                'total coupons claimed'
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
        }
    };

    totalRadarPerTag = () => {
        return {
            labels: ['beer', 'wine', 'cocktail', 'pizza', 'burrito', 'hamburger', 'pasta', 'sushi', 'steak'],
            datasets: [
                {
                    label: 'COUPONS CREATED PER CATEGORY',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    
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
                }
            ]
        }
    }

    totalBarsGraph = () => {
        return {
            labels: ['October', 'November', 'December', 'January', 'February', 'March'],
            datasets: [
                {
                    label: 'Coupons Claimed',
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    data: [
                        this.state.month.octused,
                        this.state.month.novused,
                        this.state.month.decused,
                        this.state.month.janused,
                        this.state.month.febused,
                        this.state.month.marused,
                    ]
                },
                {
                    label: 'Coupons Created',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [
                        this.state.month.octtotal,
                        this.state.month.novtotal,
                        this.state.month.dectotal,
                        this.state.month.jantotal,
                        this.state.month.febtotal,
                        this.state.month.martotal
                    ]
                }

            ]
        }
    }

    componentWillMount() {
        this.totalPizza()
        this.totalRadar()
        this.totalBars()
    }

    render() {
        return (
            <div style={{maxWidth: '95%', width: '95%' }}>
                <div style={{ marginTop: 20, paddingTop: 30 }}>
                    <Doughnut data={this.totalCouponsDoughnut} />
                </div>
                <div style={{ marginTop: 20, paddingTop: 30 }}>
                    <Radar data={this.totalRadarPerTag} />
                </div>
                <div style={{ marginTop: 20, paddingTop: 30 }}>
                    <Bar data={this.totalBarsGraph}/>
                </div>

        </div>

        )
    }
}

export default Statistic