import React from 'react'
// import { Button, Navbar, NavbarBrand, NavbarToggler, Nav, Collapse, NavItem } from 'react-bootstrap'
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Resource from '../../../models/resource'


import MeetUp from './MeetUp'
import Statistic from './Statistic'
import CreateCoupon from './CreateCoupon'
const RestaurantId = Resource('restaurants')

class Restaurant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: "",
            restaurantId: (this.props.match.params.id || null),
            clicked: 'meetups',
            collapsed: true
        }
        this._onButtonClick = this._onButtonClick.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    componentWillMount() {
        if (!this.state.restaurantId) return
        RestaurantId.find(this.props.match.params.id)
            .then((result) => {
                this.setState({
                    results: result,
                    errors: null,
                    meets: result.meetups
                })
                }
        )
            .catch((errors) => this.setState({ errors: errors }))
    }

    _onButtonClick(button) {
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
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
 
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


        return (
            <div>
                <Navbar color="faded" light>
                    <NavbarBrand href="/" className="mr-auto"></NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
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
                        </Nav>
                    </Collapse>
                </Navbar>



                
                {returned}
            </div>
        )
    }
}

export default Restaurant