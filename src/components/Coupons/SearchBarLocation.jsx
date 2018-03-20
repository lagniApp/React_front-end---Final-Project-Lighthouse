import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class SearchBarLocation extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
    this.onChange = (address) => this.setState({ address })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

   handleEnter = (address) => {
      geocodeByAddress(address)
        // .then(results => {
        //   console.log('results', results)
        // })
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        // console.log('Success', latLng)
        // console.log(latLng.lat)
        this.props.handleSearchLocation(latLng)
      })
      .catch(error => console.error('Error', error))

    }

  render() {

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Search Places...'
    }

    const defaultStyles = {
      root: {
        position: 'relative',
        paddingBottom: '0px',
        
      },
      input: {
        display: 'inline-block',
        width: '40%',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '10px 10px 5px grey',
      },
      autocompleteContainer: {
        position: 'absolute',
        top: '100%',
        backgroundColor: 'white',
        border: '1px solid #555555',
        width: '50%',
        zIndex: '7',
        boxShadow: '10px 10px 5px grey',


      },
      autocompleteItem: {
        backgroundColor: '#ffffff',
        padding: '10px',
        color: '#555555',
        cursor: 'pointer',
      },
      autocompleteItemActive: {
        backgroundColor: '#fafafa'
      },
    }

    return (
      <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete inputProps={inputProps}
        onEnterKeyDown={this.handleEnter}
        styles={defaultStyles}/>
      </form>
    )
  }
}

export default SearchBarLocation

