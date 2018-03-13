import React from 'react'
import Restaurant from './Restaurant'

class MeetUp extends React.Component {
    constructor(props) {
        super(props)
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