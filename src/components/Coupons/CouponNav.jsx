import React from 'react'
import {Route, Switch, Link} from 'react-router-dom'

import beer from '../../images/beer.png'
import wine from '../../images/wine-glass.png'
import cocktail from '../../images/cocktail.png'
import pizza from '../../images/pizza.png'
import food from '../../images/cutlery.png'
import burrito from '../../images/burrito.png'
import hamburger from '../../images/hamburger.png'
import pasta from '../../images/spaghetti.png'
import sushi from '../../images/sushi.png'
import steak from '../../images/steak.png'

class CouponNav extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={beer} className="App-logo" alt="logo" />
          <h1 className="App-title">Lagni App</h1>
        </header>
        <div class="page-container">
          <div className="App-intro">Welcome</div>
          <div class="image-buttons">
            <button type="button"><img src={beer} alt="beer"/></button>
            <button type="button"><img src={wine} alt="wine"/></button>
            <button type="button"><img src={cocktail} alt="cocktail"/></button>
            <button type="button"><img src={food} alt="all food"/></button>
            <button type="button"><img src={pizza} alt="pizza"/></button>
            <button type="button"><img src={burrito} alt="burrito"/></button>
            <button type="button"><img src={hamburger} alt="hamburger"/></button>
            <button type="button"><img src={sushi} alt="sushi"/></button>
            <button type="button"><img src={pasta} alt="pasta"/></button>
            <button type="button"><img src={steak} alt="steak"/></button>
          </div>
          <div class="search-bar">
            <input type="text" placeholder="Search.."/>
          </div>
        </div>
      </div>
    )
  }
}

export default CouponNav