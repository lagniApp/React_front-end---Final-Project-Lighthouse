import React from 'react'
import Chart from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Row, Col, PageHeader, Table } from 'react-bootstrap'
import { Route, Switch, Link } from 'react-router-dom'
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

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
            coupons: [],
            restaurants: [],
            tagsNames:[],
            tags:[],
            errors: null,
            visibleRestaurants: [],
            isReady: false,
            search: '',
            arrayCountTags: []

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
        this.countTagsCuisine(visibleRestaurants)
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

    componentWillMount() {
        //find all restaurants
        Restaurants.findAll()
            .then((result) => {
                this.countTagsCuisine(result)
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
                console.log(arrayPushTagNames)
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

    countTagsCuisine = (visibleRestaurants) => {

        let arrayCountTags = [0,0,0,0,0,0,0,0,0]
        
        visibleRestaurants.map((restaurant) => {
        if (restaurant.couponsJSON) {
            restaurant.couponsJSON.map((innerRestaurant) => {
                if (innerRestaurant.tags) {
                    innerRestaurant.tags.map((tag) => {
                        console.log(tag.cuisine)
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
        this.setState({ arrayCountTags: arrayCountTags })
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
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Coupons Created',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                }

            ]
        };
    }


    render() {


        // let filterRestaurants = this.state.search
        return (
            <div>
                <div>Search Restaurants</div>
                <div className="search-bar">
                    <input type="text"
                        value={this.state.search}
                        onChange={event => { this._handleSearchChange(event.target.value) }}
                        placeholder="Search.." />
                </div>
                {this.state.visibleRestaurants.map((restaurant) => {
                    return (
                            <ListGroup className="restaurant-list">
                                <ListGroupItem href="#" disabled>
                                    Restaurant: <b>{restaurant.name}</b>
                                </ListGroupItem>
                            </ListGroup>

                    )
                })}
                <div >
                {/* <div style={{height: '11em'}}> */}
                    <h2>COUPONS PER CATEGORY</h2>
                    <Radar data={this.radarGraph} />
                </div>
                <div>
                    <h2>COUPONS CREATED X COUPONS CLAIMED</h2>
                    <Bar
                        data={this.barGraph}
                        width={100}
                        height={100}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
            </div>
        )
    }


}


export default Statistic