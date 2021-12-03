import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';

import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Components/Review/Review';
import ManageInventory from './Components/ManageInventory/ManageInventory';
import PageNotFounded from './Components/PageNotFounded/PageNotFounded';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Shipment from './Components/Shipment/Shipment';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import {addToDatabaseCart, getDatabaseCart} from './utilities/databaseManager'

export const UserContext = createContext();

function App() {

const [loggedInUser, setLoggedInUser] = useState([]);




  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>

      <Router>
      <Header></Header>
        <Switch>
        <Route path="/home">
            <Shop></Shop>
          </Route>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/manage">
              <ManageInventory></ManageInventory>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey"> 
            <ProductDetails></ProductDetails>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="*">
           <PageNotFounded></PageNotFounded>
          </Route>
        </Switch>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
