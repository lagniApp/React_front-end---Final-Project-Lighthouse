import React from 'react'

class ButtonTag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tagStyle: "",
      tagOn: false,
    }
  }


  render() {
    return (
        <button type="button" onClick={this._toggleTag} value={this.props.tagName} className={this.state.tagStyle}>
        <img src={this.props.tagImg} alt={this.props.tagName}/>
        </button>
    )
  }

  _toggleTag = (e) => {
    const { tagOn } = this.state;
    const tagVal = e.currentTarget.value

    if (tagOn) {
      this.props.toggleTag(tagVal, 'Off');
      this.setState({
        tagOn: false,
      });
    } else {
      this.props.toggleTag(tagVal, 'On');
      this.setState({
        tagOn: true,
      });
    }
  }

  _tagClicked = (e) => {
    // change style of tag when clicked
    this.state.tagStyle ?  this.setState({tagStyle: ""}) : this.setState({tagStyle: "button-tag"});
    // grab the type of tag that was clicked
    const tagVal = e.currentTarget.value
    let tags = []
    for (let coupon of this.props.coupons) {
      for (let tag of coupon.tags) {
          let couptag = tag.cuisine.toLowerCase();
        // compare a coupon's tags to the tag that was clicked
        if (tagVal === couptag) {
          tags.push(coupon);
        }
      }
    }
    console.log("ARRAY", tags)
    this.props.toggleTag(tags)

  }
}
console.log('hey')

export default ButtonTag
