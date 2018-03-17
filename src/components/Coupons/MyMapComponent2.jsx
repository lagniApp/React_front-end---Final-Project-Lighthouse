import React from 'react'
import {Modal, Button} from 'react-bootstrap'

import ReactDOM from 'react-dom';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'

const secret = require('../../secret')
const googleApiKey = secret.GOOGLE_API_KEY

const MyMapComponent2 = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={12.5} defaultCenter={ props.marker }>
      {props.isMarkerShown && (
        <span>
          <MarkerWithLabel
            position={ props.marker }
            labelAnchor={{x:0,y:0}}
            labelStyle={ props.markerStyle }>
            <div>{props.coupon.restaurant.name}</div>
          </MarkerWithLabel>
        </span>
      )}
    </GoogleMap>
));

export default MyMapComponent2