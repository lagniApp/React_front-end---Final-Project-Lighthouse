import React from 'react'
import Chart from 'chart.js';
import { Doughnut, Radar, Bar } from 'react-chartjs-2';
import { Row, Col, PageHeader, Table } from 'react-bootstrap'
import { Route, Switch, Link } from 'react-router-dom'
import { Grid, Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

import Coupon from '../Coupons/Coupon'

// Client-side model
import Resource from '../../models/resource'
const Restaurants = Resource('restaurants')
const AllTags = Resource('tags')
const AllCoupons = Resource('coupons')

class Statistic extends React.Component {
    constructor(props) {
        super(props)

        this.filterRestaurants = this.filterRestaurants.bind(this);
        this._handleSearchChange = this._handleSearchChange.bind(this);
        // this.CouponsCreated = this.CouponsCreated.bind(this);
        this.radarGraph = this.radarGraph.bind(this);

        this.state = {
            total_quantity: 0,
            total_remaining: 0,
            total_used: 0,
            coupons: [],
            restaurants: [],
            tagsNames:[],
            tags:[],
            errors: null,
            visibleRestaurants: [],
            isReady: false,
            search: '',
            arrayCountTags: [],
            month: {}

        }
    }


    filterRestaurants = () => {
        const { restaurants, search } = this.state;
        let visibleRestaurants = restaurants;

        if (search) {
            visibleRestaurants = visibleRestaurants.filter(
                (restaurant) => {
                    // console.log("REST", restaurant)
                    return restaurant.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                }
            )
        }
        this.countTagsCoupons(visibleRestaurants)
        this.setState({
            visibleRestaurants: visibleRestaurants
        })
    }

    tag = (restaurant) => {
        let countCoupons = 0
        // restaurants.map((restaurant) => {
        if (restaurant.couponsJSON) {
            restaurant.couponsJSON.map((coupon) => {
                countCoupons += 1;
            })
            console.log(countCoupons)

            this.setState({ countCoupons: countCoupons })
        } else {
            this.setState({ countCoupons: 0 })
        }
        // })
    }

    componentDidMount() {
        //find all restaurants
        Restaurants.findAll()
            .then((result) => {
                this.countTagsCoupons(result)
                this.setState({ restaurants: result, visibleRestaurants: result, errors: null })
                // console.log(this.state.visibleRestaurants)
            })
            .catch((errors) => this.setState({ errors: errors }))
        //find all restaurants
        AllTags.findAll()
            .then((result) => {
                let arrayPushTagNames = []
                result.map((tag) => {
                    arrayPushTagNames.push(tag.cuisine)
                })
                // console.log(arrayPushTagNames)
                this.setState({ tagsNames: arrayPushTagNames, tags: result, errors: null })
                // console.log(this.state.visibleRestaurants)
            })
            .catch((errors) => this.setState({ errors: errors }))
        // AllCoupons.findAll()
        //     .then((result) => {

        //         this.setState({ coupons: result, errors: null })
        //     })
        //     .catch((errors) => this.setState({ errors: errors }))
    }
    
 
    _handleSearchChange = (term) => {
        console.log("search", term)
        this.setState({ search: term, errors: null, }, this.filterRestaurants)
    }


    countCounponsMonth = (coupon, month) => {
        switch (coupon.expiration_time.slice(5, 7)) {
            case '10':
                month.octtotal += coupon.quantity
                // console.log(month.oct.total)
                month.octused += coupon.quantity - coupon.remaining
                break;
            case '11':
                month.novtotal += coupon.quantity
                month.novused += coupon.quantity - coupon.remaining
                break;
            case '12':
                month.dectotal += coupon.quantity
                month.decused += coupon.quantity - coupon.remaining
                break;
            case '01':
                month.jantotal += coupon.quantity
                month.janused += coupon.quantity - coupon.remaining
                break;
            case '02':
                month.febtotal += coupon.quantity
                month.febused += coupon.quantity - coupon.remaining
                break;
            case '03':
                month.martotal += coupon.quantity
                month.marused += coupon.quantity - coupon.remaining
                break;
            default:
                break;
        }
        this.setState({ month: month })
    }


    // }
    countTagsCoupons = (visibleRestaurants) => {

        let arrayCountTags = [0,0,0,0,0,0,0,0,0]
        let total_quantity = 0
        let total_remaining = 0
        let total_used = 0
        let month = {
            octused: 0,
            novused: 0,
            decused: 0,
            janused: 0,
            febused: 0,
            marused: 0,
            octtotal: 0,
            novtotal: 0,
            dectotal: 0,
            jantotal: 0,
            febtotal: 0,
            martotal: 0,
        }
        
        visibleRestaurants.map((restaurant) => {
            if (restaurant.couponsJSON) {
                restaurant.couponsJSON.map((coupon) => {
                    this.countCounponsMonth(coupon, month)
                    //counting coupons
                    total_quantity += coupon.quantity
                    total_remaining += coupon.remaining
                    total_used += coupon.quantity - coupon.remaining
                    // counting tags
                    if (coupon.tags) {
                        coupon.tags.map((tag) => {
                            // console.log(tag.cuisine)
                            switch (tag.cuisine) {
                                case "beer":
                                    arrayCountTags[0] += 1
                                    break;
                                case "wine":
                                    arrayCountTags[1] += 1
                                    break;
                                case "cocktail":
                                    arrayCountTags[2] += 1
                                    break;
                                case "pizza":
                                    arrayCountTags[3] += 1
                                    break;
                                case "burrito":
                                    arrayCountTags[4] += 1
                                    break;
                                case "hamburger":
                                    arrayCountTags[5] += 1
                                    break;
                                case "pasta":
                                    arrayCountTags[6] += 1
                                    break;
                                case "sushi":
                                    arrayCountTags[7] += 1
                                    break;
                                case "steak":
                                    arrayCountTags[8] += 1
                                    break;
                            
                                default:
                                    break;
                            }
                        })
                    }

                })
            }
        })
        this.setState({ 
            // month: month,
            arrayCountTags: arrayCountTags, 
            total_quantity: total_quantity,
            total_remaining: total_remaining,
            total_used: total_used, 
        })
    }





    //options for the radar chart
    radarGraph = () => {
        return {
            labels: this.state.tagsNames,
            datasets: [
                {
                    label: 'COUPONS CREATED PER CATEGORY',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.arrayCountTags
                    // data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        }
    };

    //options for the bar chart
    barGraph = () => {
        return {
            labels: ['October', 'November', 'December','January', 'February', 'March'],
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
        };
    }

    doughnutGraph = () => {
        return {
            labels: [
                'Total coupons available',
                'Total coupons unclaimed',
                'Total coupons claimed'
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
    }


    render() {


        // let filterRestaurants = this.state.search
        return (
            <div className="admin-backg" style={{ height: '1%' }}>
                <Grid style={{ marginTop: '', marginLeft: 0, marginRigth: 0, maxWidth: '100%', width: '100%' }}>
                    <Row className="show-grid">
                        <Col xs={18} lg={2} style={{ justifyContent: 'center', borderRadius: '8px' }}>
                            <div className="search-bar">
                                <input type="text" className="search-rest-stats"
                                    value={this.state.search}
                                    onChange={event => { this._handleSearchChange(event.target.value) }}
                                    placeholder="Search Restaurant.." />
                            </div>
                        </Col>

                    </Row>

                    <Row className="show-grid">
                        <Col xs={6} lg={2} style={{ marginTop: '2em', fontSize: "1.3em"  }}>
                            {this.state.visibleRestaurants.map((restaurant) => {
                                return (
                                    <ListGroup className="restaurant-list">
                                        <ListGroupItem href="#" disabled>
                                            Restaurant: <b>{restaurant.name}</b>
                                        </ListGroupItem>
                                    </ListGroup>
                                )
                            })}
                        </Col>
                        <Col xs={1} lg={10}>
                            <Col xs={6} lg={6}>
                                <div className="charts-admin" >
                                    <h2 className="title-charts">COUPONS AVAILABLE vs COUPONS CLAIMED</h2>
                                    <Doughnut data={this.doughnutGraph} />
                                </div>
                            </Col>
                            <Col xs={6} lg={6}>
                            <div className="charts-admin">
                                <h2 className="title-charts">COUPONS CREATED BY CATEGORY</h2>
                                <Radar data={this.radarGraph} />
                            </div>
                            </Col>
                            <Col xs={6} lg={12} style={{ marginTop: '3em', marginBottom: '2em' }}>
                                <div className="charts-admin">
                                    <h2 className="title-charts">COUPONS CREATED X COUPONS CLAIMED</h2>
                                    <Bar
                                        data={this.barGraph}
                                        width={100}
                                        height={30}
                                    />
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }


}


export default Statistic