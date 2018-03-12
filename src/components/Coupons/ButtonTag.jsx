import React from 'react'

class ButtonTag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tagStyle: ""
    }
  }


  render() {
    return (
        <button type="button" onClick={this._tagClicked} value={this.props.tagName} className={this.state.tagStyle}>
        <img src={this.props.tagImg} alt={this.props.tagName}/>
        </button>
    )
  }

  _tagClicked = (e) => {
    // change style of tag when clicked
    this.state.tagStyle?  this.setState({tagStyle: ""}) : this.setState({tagStyle: "button-tag"});
    // grab the type of tag that was clicked
    const tagVal = e.currentTarget.value
    let tags = []
    for (let coupon of this.props.coupons) {
      for (let tag of coupon.tags) {
          let couptag = tag.cuisine.toLowerCase();
        // compare a coupon's tags to the tag that was clicked
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
