import React from 'react'
import { Button, Collapse, NavbarToggler, NavbarBrand, Navbar, Nav, NavItem, NavLink, Card, PageHeader, Row, Col } from 'reactstrap';
// import { Button, Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { Grid } from 'react-bootstrap'
import Resource from '../../../models/resource'
import { Redirect, BrowserRouter as Router } from 'react-router-dom'

import lagniLogo from '../../../images/logo.png'
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
            reload: false,
        }
    }
    // static propzTypes = {
    //     cookies: instanceOf(Cookies).isRequired
    // };

    componentDidMount() {
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
                    meets: result.meetups,
                })
            })
            .catch((errors) => this.setState({ errors: errors }))

        }

    statistics = () => {
        return (            
        <div className = "col-lg-6 col-md-12" >
            <Statistic meets={this.state} />
        </div >
        )
    }
        
    logout() {
        Cookies.remove("userID", { path: '/restaurants' }) 
        window.location.href = `/restaurants`
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    _onButtonClick = () => {
        this.setState({ reload: !this.state.reload })
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
        let states = ""
        let recharging = ""
        if (this.state.reload) {
            recharging = (
                <div className="col-lg-6 col-md-12" style={{ borderRadius: "5px", paddingBottom: 20 }} >
                    <Recharge meets={this.state} />
                </div>
            )
        }
        if (this.state.results) {
            states = this.statistics()
        }

        return (
            <div className="rest-backg">
                <Grid style={{maxWidth: '100%', width: '100%'}}>
                        <Router>
                            <Navbar className="nav-bar" style={{ maxWidth: '100%', width: '100%', backgroundColor: '#274076', marginBottom: 0, borderRadius: 5, color: "white" }}>
                                <Col class="col-lg-1">
                                    <img style={{maxWidth: '10%', width: '10%' }} src={lagniLogo} />
                                </Col>
                                <Col class="col-lg-2" styles={{ fontColor: "white" }}>
                                    <p style={{ color: "white", fontSize: "large", margin: "0px 0 0px" }}>{this.state.results.name}</p>
                                </Col>
                                <Col class="col-lg-3">
                                    <div style={{ float: "right", fontSize: "large", fontColor: "white" }}>
                                        Restaurant balance: ${this.state.results.balance}
                                        <Button style={{ float: "right", marginLeft: 10, marginRight: 15, backgroundColor: '#3F51B5' }} onClick={() => this._onButtonClick()}>
                                            +
                                        </Button>
                                    </div>
                                </Col>
                                <Col class="col-lg-4">
                                    <Button style={{ float: 'right', fontSize: "initial", marginLeft: 10, backgroundColor: '#3F51B5', borderRadius: "5px" }} onClick={this.logout}>
                                        Logout
                                    </Button>
                                </Col>
                            </Navbar>
                        </Router>   
                        
                        <div style={{ paddingTop: 10, marginTop: 10, width: '100%' }}>
                            <div className="rows">
                                <div className="col-lg-3 col-md-6" style={{ borderColor: "#337ab7", borderTop: "0px solid #ddd" }}>
                                    <CreateCoupon restaurant={this.state} />
                                </div>
                                <div className="col-lg-3 col-md-6" style={{ borderColor: "#337ab7", borderTop: "0px solid #ddd" }}>
                                    <MeetUp meets={this.state} />
                                </div>
                                <div>
                                    {recharging}
                                    {states}
                                </div>
                            </div>
                    </div>
                </Grid>
            </div>
        )
    }
}

export default Restaurant