import './App.css';
import React, { Fragment } from 'react'
import WaitersView from './components/waiters.jsx'
import Home from './components/home.jsx'
import CuisineView from './components/cuisine.jsx'
import DeliverOrders from './components/deliverorders.jsx'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

const App = () => {
  return (
    <Fragment>
      <Router>

        <Switch>
          <Route exact path="/">
          <Home></Home>
          </Route>
           
          <Route path="/waiters">
          <WaitersView></WaitersView>
          </Route>

          <Route path="/cuisine">
          <CuisineView></CuisineView>
          </Route>

          <Route path="/deliverorders">
          <DeliverOrders></DeliverOrders>
          </Route>

        </Switch>

      </Router>
    </Fragment>
  );
}

export default App;
