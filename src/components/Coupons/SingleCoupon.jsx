import React from 'react'
import CouponModal from './CouponModal'
import PhoneModal from './PhoneModal'
import Resource from '../../models/resource'

// import images
import beer from '../../images/beer.png'
import wine from '../../images/wine-glass.png'
import cocktail from '../../images/cocktail.png'
import pizza from '../../images/pizza.png'
import burrito from '../../images/burrito.png'
import hamburger from '../../images/hamburger.png'
import pasta from '../../images/spaghetti.png'
import sushi from '../../images/sushi.png'
import steak from '../../images/steak.png'


const CouponId = Resource('coupons')
const NewTwilio = Resource('messages')


class SingleCoupon extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      phoneShow: false,
      couponId: this.props.match.params.id || null,
      restaurantId: this.props.match.params.restaurant_id,
      results: "",
      taglist: {'beer': beer, 'wine': wine, 'cocktail': cocktail, 'pizza': pizza,
        'burrito': burrito, 'hamburger' :hamburger, 'pasta': pasta, 'sushi': sushi, 'steak': steak},
      ready: false,
      isReady: false,
      coupon: "",
      currentLocation: {}
    }
  }

  componentWillMount() {
    if(this.state.restaurantId) return
        CouponId.find(this.props.match.params.id)
            .then((result) => {
                this.setState({
                    results: result,
                    errors: null,
                    meets: result.meetups,
                    ready: true,
                    coupon: result
                })
              console.log(result)
              console.log(this.state)
            })
            .catch ((errors) => this.setState({ errors: errors }))
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handlePhoneClose = () => {
    this.setState({ phoneShow: false });
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handlePhoneShow = () => {
    this.setState({ phoneShow: true });
  }


  _handleTwilioMessage = (data, phone) => {
      console.log("DATA", data)
      let messageData = {
        restName: data.restaurant.name,
        couponInfo: data.description,
        address: data.restaurant.address,
        phone: phone,
        id: data.id
      }
    // check coupon quantity is > 0
    if(data.remaining > 0){
      if(phone.length === 11 && phone.match(/^\d+$/)){
        this.setState({ userPhone: phone })
        // send twilio message
        NewTwilio.create( { messageData } )
        .then((result) => {
          const updatedVisibleCoupons = this.state.visibleCoupons.map((coupon) => {
            if (coupon.id === data.id) {
              coupon.remaining ? coupon.remaining-- : coupon.remaining = 0;
            }
              return coupon
          })
          this.setState({visibleCoupons: updatedVisibleCoupons})
          // alert("Enjoy your coupon")
          // this.setState({ coupons: result, visibleCoupons: result, errors: null })
        })
        // .then(() => this.setState({ redirect: true }))
        .catch((errors) => this.setState({ errors: errors }))

      }else {
        alert("Input error: phone number must contain 11 digits only ex. 16471234455")
      }
    } else {
      // if quantity is = 0
      alert("Sorry, no more coupons available")
    }
  }

  render() {

    const tags = []
    for (const prop in this.state.taglist) {
      const tagName = prop
      const tagImg = this.state.taglist[prop]
      tags.push({[tagName]: tagImg})
    }

    return (
      <div>{this.state.ready &&

        <div>
        <div className="App">
          <header className="App-header">

            <h1 className="App-title">Lagni App</h1>
            <a className="restaurant-link" href="/">home</a>
          </header>
          <div className="page-container">
            <div className="App-intro"></div>
            <div className="image-buttons">
            </div>
          </div>
        </div>

        <div className="coupon-container"id="single-coupon" >
          <div className="coupon-image-tags">
            {this.state.results.tags.map((tag) => {
              let img = tag.cuisine.toLowerCase()
              let style;
              for (const prop in this.state.taglist) {
                if (prop === img) {
                  style = this.state.taglist[prop]
                }
              }
              return <img src={style} alt="tagimg"/>
            })}
          </div>
          <div className="restaurant-name"> {this.state.results.restaurant.name} </div>
          <div className="coupon-info">       {this.state.results.description} </div>
          <div className="coupons-left"> {this.state.results.remaining} Coupons Remaining</div>
          <button type="button" onClick={this.handleShow} >Restaurant Info</button>
          <button type="button" onClick={this.handlePhoneShow}>Get Coupon</button>

          <CouponModal show={this.state.show}
            handleClose={this.handleClose}
            coupon={this.state.coupon}
            currentLocation={this.state.currentLocation}
            isReady={this.state.isReady}/>
          <PhoneModal phoneShow={this.state.phoneShow}
            handlePhoneClose={this.handlePhoneClose}
            coupon={this.state.results}
            onPhoneInput={this._handlePhoneChange}
            twilioMessage={this._handleTwilioMessage}
            />
        </div>
        </div>
      }
      </div>
    )
  }
}

export default SingleCoupon








