import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import {Grid} from 'react-bootstrap'
import '../App.css';
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';

import CouponList from './Coupons/CouponList'
import Restaurant from './Restaurant/Restaurant'
// import MeetUp from './Restaurant/MeetUp'
import Restaurants from './Restaurants/Restaurants'

// import MeetUp from './Restaurant/MeetUp'

import Restaurant from './Restaurants/Restaurant/Restaurant'




const App = (props) => (
  <div>
      <Switch>
        <Route path="/" exact component={CouponList} />
        <Route path="/restaurants" component={Restaurants} />
        <Route path="/restaurants/:id" component={Restaurant} />
      </Switch>
  </div>
)

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={beer} className="App-logo" alt="logo" />
//           <h1 className="App-title">Lagni App</h1>
//         </header>
//         <div class="page-container">
//           <div className="App-intro">Welcome</div>
//           <div class="image-buttons">
//             <button type="button"><img src={beer} alt="beer"/></button>
//             <button type="button"><img src={wine} alt="wine"/></button>
//             <button type="button"><img src={cocktail} alt="cocktail"/></button>
//             <button type="button"><img src={food} alt="all food"/></button>
//             <button type="button"><img src={pizza} alt="pizza"/></button>
//             <button type="button"><img src={burrito} alt="burrito"/></button>
//             <button type="button"><img src={hamburger} alt="hamburger"/></button>
//             <button type="button"><img src={sushi} alt="sushi"/></button>
//             <button type="button"><img src={pasta} alt="pasta"/></button>
//             <button type="button"><img src={steak} alt="steak"/></button>
//           </div>
//           <div class="search-bar">
//             <input type="text" placeholder="Search.."/>
//           </div>

          // <div class="coupon-container">
          //   <div class="coupon-image-tags">
          //     <img src={beer} alt="beer"/>
          //     <img src={beer} alt="beer"/>
          //     <img src={beer} alt="beer"/>
          //     <img src={beer} alt="beer"/>
          //   </div>
          //   <div class="restaurant-name"><h3> Restaurant Name </h3></div>
          //   <div class="coupon-info"> Coupon Info and more stuff </div>
          //   <button type="button">Map</button>
          //   <button type="button">Get Coupon</button>
          // </div>

//           <div class="coupon-container">
//             <div class="coupon-image-tags">
//               <img src={wine} alt="beer"/>
//               <img src={pizza} alt="beer"/>
//               <img src={sushi} alt="beer"/>
//             </div>
//             <div class="restaurant-name"><h3> Crazy Johnnys </h3></div>
//             <div class="coupon-info"> Half off Everything!  What a crazy place!! </div>
//             <button type="button">Map</button>
//             <button type="button">Get Coupon</button>
//           </div>

//           <div class="coupon-container">
//             <div class="coupon-image-tags">
//               <img src={burrito} alt="beer"/>
//               <img src={hamburger} alt="beer"/>
//             </div>
//             <div class="restaurant-name"><h3> Big Sallys Really Long Restaurant Name </h3></div>
//             <div class="coupon-info"> Double up!  Buy a burger and get a free BuRRRIto</div>
//             <button type="button">Map</button>
//             <button type="button">Get Coupon</button>
//           </div>


//         </div>
//       </div>
//     );
//   }
// }

export default App
