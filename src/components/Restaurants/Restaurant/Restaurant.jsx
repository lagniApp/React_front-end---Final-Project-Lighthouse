import React from 'react'
// import Navigation from 'react-toolbox/lib/navigation';
// import Link from 'react-toolbox/lib/link';
import Resource from '../../../models/resource'

import MeetUp from './MeetUp'
const RestaurantId = Resource('restaurants')

class RestaurantePage extends React.Component {
    render() {
        return (
            <button {...this.props}>
                Coupons
            </button>
        );
    }
}
class Coupon extends React.Component {
    render() {
        return (
            <button {...this.props}>
                Coupons
            </button>
        );
    }
}

class Statistic extends React.Component {
    render() {
        return (
            <button {...this.props}>
                Statistic
            </button>
        );
    }
}
class Restaurant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: "",
            restaurantId: (this.props.match.params.id || null),
            show: false,
            redirect: '',
            clicked: false
        }
        this.handleClick = this.handleClick.bind(this);
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
                // console.log(result.meetups)
                }
        )
            .catch((errors) => this.setState({ errors: errors }))
    }

    handleClick() {
        this.setState({
            clicked: true
        });
    }

    render() {
        return (
            <div>
                <p>
                {this.state.results.name}
                </p>
                <p>
                {this.state.results.phone}
                </p>
                <p>
                {this.state.results.address}
                </p>
                <p>
                {this.state.results.balance}
                </p>
                <MeetUp meets={this.state.meets} />

                {/* <div>
                    <Coupon onClick={this.handleClick} />
                    {this.state.clicked ? <Redirect /> : MeetUp}
                    </div>
                    <div>
                    <Statistic onClick={this.handleClick} />
                    {this.state.clicked ? <NewComponent /> : MeetUp}
                </div> */}
            </div>
        )
        
        // ReactDOM.render(element, MeetUp.getElementById('meetup'));
    }
}


export default Restaurant