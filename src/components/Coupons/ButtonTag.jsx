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
        tagStyle: "",
        tagOn: false
      });
    } else {
      this.props.toggleTag(tagVal, 'On');
      this.setState({
        tagStyle: "button-tag",
        tagOn: true
      });
    }
  }

}

export default ButtonTag
