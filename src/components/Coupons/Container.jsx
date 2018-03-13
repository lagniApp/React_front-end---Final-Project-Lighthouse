import React from 'react'

export class Container extends React.Component {
  render() {
    console.log(hi)
    const style = {
      width: '100vw',
      height: '100vh'
    }
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
      <div style={style}>
        <Map google={this.props.google}
          />
      </div>    )
  }
}

export default GoogleApiComponent({
  apiKey: __GAPI_KEY__
})(Container)

export class Map extends React.Component {
  render() {
    return (
      <div ref='map'>
        Loading map...
      </div>
    )
  }
}
