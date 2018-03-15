import React from 'react'
import { Row, Col, PageHeader, Table } from 'react-bootstrap'
import { Route, Switch, Link } from 'react-router-dom'
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

import Coupon from '../Coupons/Coupon'

// Client-side model
import Resource from '../../models/resource'
const Restaurants = Resource('restaurants')

class AllRestaurants extends React.Component {
    constructor(props) {
        super(props)

        this.filterRestaurants = this.filterRestaurants.bind(this);
        this._handleSearchChange = this._handleSearchChange.bind(this);
        this.CouponsCreated = this.CouponsCreated.bind(this);
        
        this.state = {
            restaurants: [],
            errors: null,
            visibleRestaurants: [],
            isReady: false,
            search: '',

        }
    }


    filterRestaurants = () => {
        const { restaurants, search } = this.state;
        let visibleRestaurants = restaurants;

        if (search) {
            visibleRestaurants = visibleRestaurants.filter(
                (restaurant) => {
                    console.log("REST", restaurant)
                    return restaurant.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                }
            )
        }

        this.setState({
            visibleRestaurants: visibleRestaurants
        })
    }

    componentWillMount() {
        Restaurants.findAll()
            .then((result) => {
                
                this.setState({ restaurants: result, visibleRestaurants: result, errors: null })
                // console.log(this.state.visibleRestaurants)
            })
            .catch((errors) => this.setState({ errors: errors }))
    }

    _handleSearchChange = (term) => {
        console.log("search", term)
        this.setState({ search: term, errors: null, }, this.filterRestaurants)
    }

    CouponsCreated = (restaurant) => {
        let countCoupons
        if (restaurant.couponsJSON) {
            restaurant.couponsJSON.map((coupon) => {
                countCoupons += 1;
            })
            return countCoupons
        } else {
            return 0
        }
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
                    console.log(restaurant)
                    return (
                    <ListGroup className="restaurant-list">
                        <ListGroupItem href="#" active>
                            Restaurant: <b>{restaurant.name}</b>
                        </ListGroupItem>
                        <ListGroupItem href="#" disabled>
                            Balance: <b>{restaurant.balance}</b>
                        </ListGroupItem>
                        <ListGroupItem href="#" disabled>
                            Coupons Created: <b>{this.CouponsCreated(restaurant)}</b>
                        </ListGroupItem>
                        <ListGroupItem href="#" disabled>
                            Address: <b>{restaurant.address}</b>
                        </ListGroupItem>
                        <ListGroupItem href="#" disabled>
                            Phone: <b>{restaurant.phone}</b>
                        </ListGroupItem>
                            <ListGroupItem style={{ marginBottom: '1em' }} href="#" disabled>
                            Email: <b>{restaurant.email}</b>
                        </ListGroupItem>

                    </ListGroup>
                    )
                })}
            </div>
        )
    }
}


export default AllRestaurants