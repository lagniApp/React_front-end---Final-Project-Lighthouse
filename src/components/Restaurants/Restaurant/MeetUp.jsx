import React from 'react'
import Restaurant from './Restaurant'
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import InjectStripe from './InjectStripe'
import { StripeProvider } from 'react-stripe-elements';
import meetupLogo from '../../../images/Meetup.png'

class MeetUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recharge: 0
        }

        this._onButtonClick = this._onButtonClick.bind(this);

    }

    _onButtonClick() {
        return <InjectStripe />
    }

    render() {
        let obj = this.props.meets.results.meetups
        let arr = []
        for (let i in obj) {
            arr.push(
                        <div className="panel panel-primary" style={{ paddingTop: 10 }}>
                            <div className="panel-heading" style={{ backgroundColor: "#FFFFFF" }}>
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-comments fa-5x"></i>
                                            <img src={meetupLogo} width="50" height="50" />
                                    </div>
                                    <div className="col-xs-9 text-right">
                                            <div className="large" style={{ color: "#F64060", fontSize: "large" }}>{obj[i].ppl_yes} people confirmed</div>
                                            <div style={{ color: "#F64060" }}>{obj[i].name}</div>
                                    </div>
                                </div>
                            </div>
                                <div className="panel-footer" style={{ backgroundColor: "#F64060" }}>
                                    <div className="fa fa-comments fa-5x" style={{ color: "#FFFFFF", fontSize: "initial" }}>{obj[i].date}</div>
                                    <div className="fa fa-comments fa-5x" style={{ color: "#FFFFFF", fontSize: "large" }}>{Math.round(obj[i].distance)} meters away</div>
                                    <div><a className="fa fa-comments fa-5x" style={{ color: "#FFFFFF", fontSize: "medium" }} href={obj[i].event_url}>More information</a></div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
            )}
            
        return (
        <div>
            {arr.map((tag) => {
                return tag
            })}
        </div>
        )
    }
}

export default MeetUp