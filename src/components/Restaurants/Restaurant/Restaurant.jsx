import React from 'react'
import { Button } from 'react-bootstrap'
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
            show: false,
            redirect: '',
            clicked: 'meetups'
        }
        this._onButtonClick = this._onButtonClick.bind(this);
    }

    componentWillMount() {
        if (!this.state.restaurantId) return
        RestaurantId.find(this.props.match.params.id)
            .then((result) => {
                this.setState({
                    results: result,
                    errors: null,
                    show: true,
                    redirect: '',
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
            <CreateCoupon meets={this.state} />
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
                <Button onClick={() => this._onButtonClick("meetups")}>
                    Meetups
                </Button>
                <Button onClick={() => this._onButtonClick("coupons")}>
                    Coupons
                </Button>
                <Button onClick={() => this._onButtonClick("statistic")}>
                    Statistic
                </Button>
                
                {returned}
            </div>
        )
    }
}

export default Restaurant