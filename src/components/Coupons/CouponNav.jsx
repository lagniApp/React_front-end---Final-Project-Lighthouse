import React from 'react'
import ButtonTag from './ButtonTag'

import SearchBarLocation from './SearchBarLocation'
// icon
import TiLocationArrowOutline from 'react-icons/lib/ti/location-arrow-outline'

import logo from '../../images/logo.png'

class CouponNav extends React.Component {

  render() {

    const tags = []

    for (const prop in this.props.taglist) {
      const tagName = prop
      const tagImg = this.props.taglist[prop]
      tags.push({[tagName]: tagImg})
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="pin-logo" alt="logo" />

          <h1 className="App-title">Lagni App</h1>
          <a className="restaurant-link" href="/restaurants">restaurant login</a>
        </header>
        <div className="page-container">
          <div className="App-intro"></div>
          <div className="image-buttons">
          {tags.map((tag) => {
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
          <p><TiLocationArrowOutline size={20} onClick={ this._getCurrentLocation } style={{cursor: "pointer"}}/> Get Current Location</p>
          <SearchBarLocation handleSearchLocation={this.props.handleSearchLocation}/>
          <div className="search-bar">
            <input type="text"
            value={this.props.search}
            onChange={event =>{this.props.onSearchChange(event.target.value)} }
            placeholder="Restaurant Name"/>
          </div>
        </div>
      </div>
    )
  }


  _getCurrentLocation = () => {
    console.log('_getCurrentLocation')
    this.props.orderByDistance()
  }
}

export default CouponNav



