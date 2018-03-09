import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import {Grid} from 'react-bootstrap'

import '../App.css';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

import TopNav from './TopNav'
import Coupons from './Coupons/Coupons'
import Restaurant from './Restaurant/Restaurant'


const App = (props) => (
  <div>
    <TopNav />
      <Switch>
        <Route path="/" exact component={Coupons} />
        <Route path="/restaurant" component={Restaurant} />
      </Switch>
  </div>
)

export default App
