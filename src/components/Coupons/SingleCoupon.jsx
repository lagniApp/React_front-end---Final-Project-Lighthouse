import React from 'react'
import Resource from '../../models/resource'
import { Route, Switch, Link, Redirect } from 'react-router-dom'

import CouponModal from './CouponModal'
import PhoneModal from './PhoneModal'

// refactor to parent component after
import beer from '../../images/beer.png'
import wine from '../../images/wine-glass.png'
import cocktail from '../../images/cocktail.png'
import pizza from '../../images/pizza.png'
import food from '../../images/cutlery.png'
import burrito from '../../images/burrito.png'
import hamburger from '../../images/hamburger.png'
import pasta from '../../images/spaghetti.png'
import sushi from '../../images/sushi.png'
import steak from '../../images/steak.png'

const CouponId = Resource('coupons')
var ReactDOM = require('react-dom');

class SingleCoupon extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            couponId: this.props.match.params.id || null,
            restaurantId: this.props.match.params.restaurant_id,
            show: false,
            phoneShow: false,
            results: ""
        }
    }

    componentWillMount() {
        if(this.state.restaurantId) return
            CouponId.find(this.props.match.params.id)
                .then((result) => {
                    this.setState({
                        results: result,
                        errors: null,
                        meets: result.meetups
                    })
                })
                .catch ((errors) => this.setState({ errors: errors }))
    }

    render() {

        return (
            <div>
                {console.log(this.state.results)}
            </div>



        )
    }










}

export default SingleCoupon