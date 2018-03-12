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
    const taglist = {'beer': beer, 'wine': wine, 'cocktail': cocktail, 'pizza': pizza,
      'food': food, 'burrito': burrito, 'hamburger' :hamburger, 'pasta': pasta, 'sushi': sushi, 'steak': steak}
    let buttons = [];
    let key = 0;
    // loop through taglist to push button elements to buttons
    for (const prop in taglist) {
      let style = taglist[prop]
      key++;
      buttons.push(<button type="button" key={key} onClick={this._tagClicked} value={prop}>
        <img src={style} alt={prop}/>
        </button>)
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={beer} className="App-logo" alt="logo" />
          <h1 className="App-title">Lagni App</h1>
        </header>
        <div className="page-container">
          <div className="App-intro">Welcome</div>
          <div className="image-buttons">
          {/*  loop through buttons array to render each button */}
          {buttons.map((button) => {
              return button
            })
          }
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search.."/>
          </div>
        </div>
      </div>
    )
  }

  _tagClicked = (e) => {
    const tagVal = e.currentTarget.value
    let tags = []
    for (let coupon of this.props.coupons) {
      for (let tag of coupon.tags) {
          let couptag = tag.cuisine.toLowerCase();
        if (tagVal === couptag) {
          coupon.filter ? coupon.filter = false : coupon.filter = true;
          tags.push(coupon);
        }
      }
    }
    this.props.toggleTag(tags)
  }
}

export default CouponNav



