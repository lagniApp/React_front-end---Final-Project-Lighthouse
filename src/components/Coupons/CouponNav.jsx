import React from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import ButtonTag from './ButtonTag'

// refactor to parent component after
import beer from '../../images/beer.png'
import wine from '../../images/wine-glass.png'
import cocktail from '../../images/cocktail.png'
import pizza from '../../images/pizza.png'
import burrito from '../../images/burrito.png'
import hamburger from '../../images/hamburger.png'
import pasta from '../../images/spaghetti.png'
import sushi from '../../images/sushi.png'
import steak from '../../images/steak.png'

class CouponNav extends React.Component {

  render() {
    // refactor to parent component after
    const taglist = [{'beer': beer}, {'wine': wine}, {'cocktail': cocktail}, {'pizza': pizza},
      {'burrito': burrito}, {'hamburger' :hamburger}, {'pasta': pasta}, {'sushi': sushi}, {'steak': steak}]


    return (
      <div className="App">
        <header className="App-header">
          <img src={beer} className="App-logo" alt="logo" />
          <h1 className="App-title">Lagni App</h1>
          <a className="restaurant-link" href="/restaurants">restaurant login</a>
        </header>
        <div className="page-container">
          <div className="App-intro">Welcome</div>
          <div className="image-buttons">
          {taglist.map((tag) => {
            let tagName;
            let tagImg;
            for (const prop in tag) {
              tagName = prop
              tagImg = tag[prop]
            }
            return <ButtonTag key={tagName} tagName={tagName} tagImg={tagImg}
              toggleTag={this.props.toggleTag} coupons={this.props.coupons}/>
            })
          }
          </div>
          <div className="search-bar">
            <input type="text"
            value={this.props.search}
            onChange={event =>{this.props.onSearchChange(event.target.value)} }
            placeholder="Search.."/>
          </div>
        </div>
      </div>
    )
  }
}

export default CouponNav



