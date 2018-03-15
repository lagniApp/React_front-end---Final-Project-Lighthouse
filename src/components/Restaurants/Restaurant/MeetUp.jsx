import React from 'react'
import Restaurant from './Restaurant'
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import InjectStripe from './InjectStripe'
import { StripeProvider } from 'react-stripe-elements';
// import { injectStripe } from 'react-stripe-elements';



class MeetUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recharge: 0
        }

        this._onButtonClick = this._onButtonClick.bind(this);

    }

    _onButtonClick() {
        console.log("clicked", this.state)
        console.log("Props", this.props.meets.results)
        return <InjectStripe />
    }

    render() {
        let obj = this.props.meets.results.meetups
        let restaurantInfo = this.props.meets.results
        let arr = []
        for (let i in obj) {
            arr.push(
            <div>
                <div><b>Name: </b>{obj[i].name}</div>
                <div><b>How many: </b>{obj[i].ppl_yes}</div>
                <div><b>Distance from restaurant: </b>{obj[i].distance} meters</div>
                <div><b>Date: </b>{obj[i].date}</div>
                <div> ------------------------------------------------------------------------------------------------------------------------------------------------- </div>
            </div>
            )}
            
        return (
        <div>
            <div>
                {console.log(this.state)}

                <p> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> </p>
                <p>
                    <b>Restaurant name: </b>{restaurantInfo.name}
                </p>
                <p>
                    <b>Restaurant number: </b>{restaurantInfo.phone}
                </p>
                <p>
                    <b>Restaurant address: </b>{restaurantInfo.address}
                </p>
                <p>
                    <b>Restaurant balance: </b>{restaurantInfo.balance}
                
                <Button onClick={this._onButtonClick}>
                    +
                </Button>
                </p>    
                <p> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> </p>
            </div>
            {arr.map((tag) => {
                return tag
            })}
        </div>
        )
    }
}

export default MeetUp