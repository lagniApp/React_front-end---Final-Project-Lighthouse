import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import Resource from '../models/resource'
// import Restaurant from './Restaurant'

const Restaurant = Resource("restaurants")

class MeetUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurantId: (this.props.match.params.id || null),
            meetups: {},
            show: false,
            erros: null,
            redirect: ""
        }
    }
    
    componentWillMount() {
        console.log(this.state)
        if (this.state.restaurantId) return 
        Restaurant.find(this.state.restaurantId)
            .then((result) => this.setState({ 
                meetups: result.data,
                show: true,
                errors: null,
                redirect: ""
            }))
            // .catch((erros) => this.setState({ erros: errors }))
    }


    render() {
        return (
            <div>
                <p xs={12}>
                    <div>
                        MeetUps
                    </div>
                    {/* <div>
                        <tbody>
                            {this.state.meetups.map((client, index) => (
                                <tr key={index}>
                                    <td>{this.state.meetups.name}</td>
                                    <td>{this.state.meetups.ppl_yes}</td>
                                    <td>{this.state.meetups.distance}</td>
                                    <td>{this.state.meetups.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </div> */}
                </p>
            </div>
        )
    }
}


export default MeetUp