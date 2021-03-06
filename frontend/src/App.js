import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddress from './screens/ShippingAddress';
import SigninScreen from './screens/SigninScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignIn = useSelector((state) => state.userSignIn);
  const {userInfo} = userSignIn;
  const  dispatch = useDispatch();

  const signoutHandler =(() => {
      dispatch(signout());
  });

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">My New Cart</Link>
        </div>
        <div>
          <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/signin">
              {
                userInfo ? (
                  <div className="dropdown">
                  <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                  <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </ul>
                  </div>
                
                ):
                (
                  <Link to="/signin">Sign In</Link>
                )
              }
            </Link>

        </div>
      </header>
      <main>
      <Route path="/" component={HomeScreen} exact></Route>  
      <Route path="/cart/:id?" component={CartScreen}></Route>        
      <Route path="/product/:id" component={ProductScreen} exact></Route>
      <Route path="/signin" component={SigninScreen} exact></Route>
      
      <Route path="/register" component={RegisterScreen} exact></Route>
      <Route path="/shipping" component={ShippingAddress} exact></Route>
      <Route path="/payment" component={PaymentMethodScreen} exact></Route>

    </main>
      <footer className="row center">2021 All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
