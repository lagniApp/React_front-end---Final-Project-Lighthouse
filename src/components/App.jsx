import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import {Grid} from 'react-bootstrap'
import '../App.css';
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';

import CouponList from './Coupons/CouponList'
import Restaurants from './Restaurants/Restaurants'
import Restaurant from './Restaurants/Restaurant/Restaurant'
import Dashboard from './Admin/Dashboard'
import { CookiesProvider } from 'react-cookie';


const App = (props) => (
  <div>
      <Switch>
        <Route path="/" exact component={CouponList} />
        <CookiesProvider>          
          <Route path="/restaurants/:id" component={Restaurant} />
          <Route path="/restaurants" component={Restaurants} />
        </CookiesProvider>
        <Route path="/adminRestricted" component={Dashboard} />
      </Switch>
  </div>
)

export default App
