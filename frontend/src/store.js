//import data from './data';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';

import { productDetailsReducer, productListReducer } from './reducers/productListReducers';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducer';

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },    
    cart: {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : [],        
    },
  };

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignIn: userSigninReducer,
    userRegister: userRegisterReducer
});

const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;