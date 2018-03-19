import React from 'react'
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Resource from '../../../models/resource'
import { Redirect } from 'react-router-dom'

import MeetUp from './MeetUp'
import Recharge from './Recharge'
import Statistic from './Statistic'
import CreateCoupon from './CreateCoupon'
import { instanceOf } from 'prop-types'
import Cookies from 'js-cookie';
import Link from 'react-router-dom/Link';
// import { withCookies, Cookies } from 'react-cookie'
const RestaurantId = Resource('restaurants')

class Restaurant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: "",
            restaurantId: (this.props.match.params.id || null),
            clicked: 'meetups',
            collapsed: true,
            show: false,
            reload: '',
        }
    }
    // static propzTypes = {
    //     cookies: instanceOf(Cookies).isRequired
    // };

    componentWillMount() {
        if (Cookies.get("userID") === this.state.restaurantId) {
            this.setState({ show: true })
        } else {
            window.location.href = `/restaurants`;
            // return <Redirect to='/restaurants' />;
        }
        // const { cookies } = this.props;

        if (!this.state.restaurantId) return
        RestaurantId.find(this.props.match.params.id)
            .then((result) => {
                this.setState({
                    results: result,
                    errors: null,
                    meets: result.meetups
                })
            })
            .catch((errors) => this.setState({ errors: errors }))
    }

    _onButtonClick = (button) => {
        switch (button){
            case "meetups":
                this.setState({
                    clicked: "meetups",
                })
                break;
            case "coupons":
                this.setState({
                    clicked: "coupons",
                })
                break;
            case "statistic":
                this.setState({
                    clicked: "statistic"
                })
                break;
            case "recharge":
                this.setState({
                    clicked: "recharge"
                })
                break;
        }
    }

    logout() {
        Cookies.remove("userID", { path: '/restaurants' }) 
        window.location.href = `/restaurants`
    }


    // toggleNavbar() {
    //     this.setState({
    //         collapsed: !this.state.collapsed
    //     });
    // }
 
    // _reloadSubmit = (event) => {
    //     event.preventDefault()
    //     console.log(this.state.reload, "RELOAD")
    //     console.log("EVENT", event.target)
    //         console.log("ID", this.state.restaurantId)
    // }


    // _updateInputValue = (event) => {
    //     console.log(event, "XXX")
    //     this.setState({
    //       reload: event.target.value
    //     })
    // }

    // _redirect = () => {
        
    //     window.location.href = `http://localhost:8080/charges/new`
    // }


    render() {
        let returned = ""
        {if (this.state.clicked === "meetups") {
            returned = 
            <div>
                <MeetUp meets={this.state} />
            </div>
        }}
        {if (this.state.clicked === "coupons") {
            returned = 
            <div>
                <CreateCoupon restaurant={this.state} />
            </div>
        }}
        { if (this.state.clicked === "statistic") {
            returned = 
            <div>
                <Statistic meets={this.state} />
            </div>
        }}
        {
        if (this.state.clicked === "recharge") {
            returned =
            <div>
                <Recharge meets={this.state} />
            </div>
        }}

        return (
            <div>
                <div>
                    <Button
                        bsStyle="primary"
                        bsSize="large"
                        onClick={this.logout}>
                        LOGOUT
                    </Button>
                            <NavItem>
                                <Button onClick={() => this._onButtonClick("meetups")}>
                                    Meetups
                                </Button>
                                <Button onClick={() => this._onButtonClick("coupons")}>
                                    Coupons
                                </Button>
                                <Button onClick={() => this._onButtonClick("statistic")}>
                                    Statistic
                                </Button>
                            </NavItem>
                </div>
                <div>


                    <p> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> </p>
                    <p>
                        <b>Restaurant name: </b>{this.state.results.name}
                    </p>
                    <p>
                        <b>Restaurant number: </b>{this.state.results.phone}
                    </p>
                    <p>
                        <b>Restaurant address: </b>{this.state.results.address}
                    </p>
                    <p>
                        <b>Current Restaurant balance: </b>{this.state.results.balance}
                        
                    
                        <Button onClick={() => this._onButtonClick("recharge")}>
                            +
                        </Button>
                    </p>
                    <p> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> </p>
                </div>
                    
                {returned}
            </div>
        )
    }
}

export default Restaurant