import React from 'react'
import { Row, Col, PageHeader, Table } from 'react-bootstrap'
import { Route, Switch, Link } from 'react-router-dom'
import { Grid, Modal, Button, ListGroup, ListGroupItem, ControlLabel, FormControl } from 'react-bootstrap'

import Coupon from '../Coupons/Coupon'

// Client-side model
import Resource from '../../models/resource'
const Restaurants = Resource('restaurants')

class AllRestaurants extends React.Component {
    constructor(props) {
        super(props)

        this.filterRestaurants = this.filterRestaurants.bind(this);
        this._handleSearchChange = this._handleSearchChange.bind(this);
        
        this.state = {
            restaurants: [],
            errors: null,
            visibleRestaurants: [],
            isReady: false,
            search: '',
            countCoupons: 0

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

        this.setState({
            visibleRestaurants: visibleRestaurants
        })
    }

    componentDidMount() {
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

    render() {
        // let filterRestaurants = this.state.search
        return (
            <div class="admin-backg" style={{ height: '1%' }}>
                <Grid style={{ marginTop: '0'}}>
                    <div style={{ marginBottom: '75%' }} class="show-restaurants-admin">
                    <Row className="show-grid">
                        <Col xs={18} lgOffset={2} lg={8} style={{ borderColor: 'black', justifyContent: 'center', borderRadius: '8px' }}>
                            <div className="search-bar">
                                <FormControl
                                    type="text"
                                    value={this.state.search}
                                    onChange={event => { this._handleSearchChange(event.target.value) }}
                                    placeholder="Search.." />
                            </div>
                        </Col>

                    </Row>

                    <Row className="show-grid">
                        <Col xs={6} lg={10} lgOffset={1} style={{ marginTop: '0' }}>
                            {this.state.visibleRestaurants.map((restaurant) => {
                                    // console.log(restaurant)
                                    return (
                                        <ListGroup style={{ marginTop: '2em', borderRadius: '40px', fontSize: "1.5em" }}  className="restaurant-list" key={restaurant.id}>
                                            <ListGroupItem href="#" active >
                                                Restaurant: <b>{restaurant.name}</b>
                                            </ListGroupItem>
                                            <ListGroupItem href="#" disabled>
                                                Balance: <b>{restaurant.balance}</b>
                                            </ListGroupItem>
                                            <ListGroupItem href="#" disabled>
                                                Coupons Created: <b>{restaurant.couponsJSON.length}</b>
                                            </ListGroupItem>
                                            <ListGroupItem href="#" disabled>
                                                Address: <b>{restaurant.address}</b>
                                            </ListGroupItem>
                                            <ListGroupItem href="#" disabled>
                                                Phone: <b>{restaurant.phone}</b>
                                            </ListGroupItem>
                                            <ListGroupItem href="#" disabled>
                                                Email: <b>{restaurant.email}</b>
                                            </ListGroupItem>
                                        </ListGroup>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                    </div>
                </Grid>
            </div>






        )
    }
}


export default AllRestaurants