import React from 'react'

class ButtonTag extends React.Component {

  render() {
    return (
        <button type="button" onClick={this._tagClicked} value={this.props.tagName}>
        <img src={this.props.tagImg} alt={this.props.tagName}/>
        </button>
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

export default ButtonTag
