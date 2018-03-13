import React from 'react'
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
            clicked: ''
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
        console.log("inside", button)
        switch (button) {
            case (button == "meetups"):
            this.setState({
                clicked: "meetups",
            });    
            console.log("Clicked")
            case (button == "coupons"):
            this.setState({
                clicked: "coupons",
            });  
            console.log("Clicked")
            case (button == "statistics"):
            this.setState({
                clicked: "statistics",
            });
            console.log("Clicked")
        }
    }

    render() {
        return (
            <div>
                <Button onClick={this._onButtonClick("meetups")}>
                    Meetups
                </Button>
                <Button onClick={this._onButtonClick("coupons")}>
                    Coupons
                </Button>
                <Button onClick={this._onButtonClick("statistic")}>
                    Statistic
                </Button>
            </div>
            // <div>
            // {if (this.props.click === "meetups") {



            // }}
            // </div>






        );
    }
}

{/* <MeetUp meets={this.state} />
<Statistic meets={this.state} />
<CreateCoupon meets={this.state} /> */}

export default Restaurant