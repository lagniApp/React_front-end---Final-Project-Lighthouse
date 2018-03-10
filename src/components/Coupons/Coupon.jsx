import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'

import Beer from '../../images/beer.png'
import Wine from '../../images/wine-glass.png'
import Cocktail from '../../images/cocktail.png'
import Pizza from '../../images/pizza.png'
import Food from '../../images/cutlery.png'
import Burrito from '../../images/burrito.png'
import Hamburger from '../../images/hamburger.png'
import Pasta from '../../images/spaghetti.png'
import Sushi from '../../images/sushi.png'
import Steak from '../../images/steak.png'



class Coupon extends React.Component {

  render() {
    const coupon = this.props.coupon
    return (
      // <div>
      //   <div>------</div>
      //   <div>{this.props.coupon.description}</div>
      //   {/*<div>{JSON.stringify(this.props.coupon)}</div>*/}
      // </div>

      <div class="coupon-container">
            <div class="coupon-image-tags">
            {coupon.tags.map((tag) => {
              console.log("TAGGG", tag.cuisine)
              const style = `${tag.cusine}`
              const img = `${this.props.url}`;
              return <img src={style} alt="{tag.cuisine}"/>
            })}

            </div>
            <div class="restaurant-name"><h3> {coupon.restaurant.name} </h3></div>
            <div class="coupon-info"> {coupon.description} </div>
            <button type="button">Map</button>
            <button type="button">Get Coupon</button>
          </div>


    )
  }
}

export default Coupon