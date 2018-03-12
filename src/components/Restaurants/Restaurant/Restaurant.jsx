import React from 'react'
import Resource from '../../../models/resource'
// import MeetUp from './MeetUp'
const RestaurantId = Resource('restaurants')


class Restaurant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: "",
            restaurantId: (this.props.match.params.id || null),
            show: false,
            redirect: ''
        }
    }

    componentWillMount() {
        if (!this.state.restaurantId) return
        console.log("IF VALID")
        RestaurantId.find(this.props.match.params.id)
            .then((result) => {
                this.setState({
                    results: result,
                    errors: null,
                    show: true,
                    redirect: '',
                })
                console.log("TEST", result)}
        )
            .catch((errors) => this.setState({ errors: errors }))
    }

    // _hide = () => {
    //     this.setState({ show: false, redirect: 'http://localhost:3002/' })
    // }

    render() {
        return (
            <div>
                {this.state.results.name}
                {/* {MeetUp} */}
            </div>
        )
    }
}

export default Restaurant