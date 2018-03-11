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
    const taglist = [{'beer': beer, 'wine': wine, 'cocktail': cocktail, 'pizza': pizza,
      'food': food, 'burrito': burrito, 'hamburger' :hamburger, 'pasta': pasta, 'sushi': sushi, 'steak': steak}]
    let buttons = [];

    return (
      <div className="App">
        <header className="App-header">
          <img src={beer} className="App-logo" alt="logo" />
          <h1 className="App-title">Lagni App</h1>
        </header>
        <div class="page-container">
          <div className="App-intro">Welcome</div>
          <div class="image-buttons">

          {taglist.map((tag) => {
            for (const prop in tag) {
                let style = tag[prop]
                buttons.push(<button type="button" onClick={ this._tagClicked } value={prop}>
                  <img src={style} alt={prop}/>
                  </button>)
            }
          })}
          {buttons.map((button) => {
              return button
            })
          }
          </div>
          <div class="search-bar">
            <input type="text" placeholder="Search.."/>
          </div>
        </div>
      </div>
    )
  }

  _tagClicked = (e) => {
    const tagVal = e.target.value
    console.log('from tagclicked', e.target.value)
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



