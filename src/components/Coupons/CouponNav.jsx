import React from 'react'
import ButtonTag from './ButtonTag'
import { Button, Grid, Row, Col } from 'react-bootstrap'


import SearchBarLocation from './SearchBarLocation'
import gps from '../../images/gps.png'


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
          <h1 className="App-title">Lagni App</h1>
          <a className="restaurant-link" href="/restaurants">restaurant login</a>
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
        </header>
        <div>
          <Grid style={{marginTop: '40px'}}>
        <Row style={{}} className="x">
                        <Col className="text-center" xs={18} lg={1} lgOffset={1}  align="right">
              <img src={gps} style={{paddingLeft: '90%', paddingTop: '25%'}} onClick={ this._getCurrentLocation } />
                                
                          </Col>
                          <Col xs={18} lg={5} >
          <SearchBarLocation handleSearchLocation={this.props.handleSearchLocation}/>
                              
                          </Col>
                          <Col xs={18} lg={3} style={{ }}>
                          <div className="search-bar">
                          
            <input type="text"
            value={this.props.search}
            onChange={event =>{this.props.onSearchChange(event.target.value)} }
            placeholder="Restaurant Name ..."/>
          </div>
                          </Col>
                        </Row>
                        </Grid>
          
         
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



