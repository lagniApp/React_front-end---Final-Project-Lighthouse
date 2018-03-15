import React from 'react'
import { Button } from 'react-bootstrap'
import Resource from '../../models/resource'
import Statistic from './Statistic'
import CreateRestaurant from './CreateRestaurant'
import AllRestaurants from './AllRestaurants'
// const ShowRestaurants = Resource('restaurants')


class Restaurant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurants: [],
            restaurantId: (this.props.match.params.id || null),
            show: false,
            redirect: '',
            clicked: 'statistic'
        }
        console.log('resturant loaded')
        this._onButtonClick = this._onButtonClick.bind(this);
    }

    //IMPLEMENT TO SHOW ALL RESTAURANTS
    // componentWillMount() {
    //     ShowRestaurants.findAll()
    //         .then((result) => {
    //             this.setState({ restaurants: result, errors: null })
    //         })
    //         .catch((errors) => this.setState({ errors: errors }))
    // }

    _onButtonClick(button) {
        switch (button){
            case "restaurant":
                this.setState({
                    clicked: "restaurant",
                })
                break;
            case "allrestaurants":
                this.setState({
                    clicked: "allrestaurants",
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
        {if (this.state.clicked === "allrestaurants") {
            returned = 
            <div>
            <AllRestaurants restaurants={this.state} />
            </div>
        }}
        {if (this.state.clicked === "restaurant") {
            returned = 
            <div>
            <CreateRestaurant newrestaurant={this.state} />
            </div>
        }}
        { if (this.state.clicked === "statistic") {
            returned = 
            <div>
            <Statistic statistic={this.state} />
            </div>
        }}


        return (
            <div>
                <Button onClick={() => this._onButtonClick("restaurant")}>
                    Login
                </Button>
                <Button onClick={() => this._onButtonClick("allrestaurants")}>
                    All Restaurants
                </Button>
                <Button onClick={() => this._onButtonClick("statistic")}>
                    Statistic
                </Button>
                <Button onClick={() => this._onButtonClick("restaurant")}>
                    New Restaurant
                </Button>
                
                {returned}
            </div>
        )
    }
}

export default Restaurant