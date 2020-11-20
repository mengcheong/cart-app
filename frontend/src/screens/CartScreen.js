import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';



//export const productListReducer = (state = {loading:true, products: [] },action) => {
const getQueryStringParams  = (query) => {
  return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split('&')
          .reduce((params, param) => {
                  let [key, value] = param.split('=');
                  params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                  return params;
              }, {}
          )
      : {}
};

function CartScreen(props) {
  const productId = props.match.params.id;

    //console.log("props.location.search:",props.location.search);

    const qty = props.location.search
    ? Number(getQueryStringParams (props.location.search).qty)
    : 1;

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const dispatch = useDispatch();
    useEffect(() => {
      if (productId) {
        dispatch(addToCart(productId, qty));
      }
    }, [dispatch, productId, qty]);      
    
    const removeFromCartHandler = ((id) =>{
      dispatch(removeFromCart(id));
    });

    const checkoutHandler = () =>{
      props.history.push('/signin?redirect=shipping');
      //alert("csadcs");
    }
    
    return (
        <div className="row top">
          <div className="col-2">
            <h1>Shopping Cart</h1>
            {
              cartItems.length === 0?
              (<MessageBox>Cart is Empty. <Link to='/'>Go to Shopping</Link></MessageBox>)
              :
              (
                <ul>
                {
                  cartItems.map(item => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img src={item.image} alt={item.name} className="small"></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                        <div>
                          <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
                          {
                                        [...Array(item.countInStock).keys()].map(
                                        (x) => (
                                            <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                            </option>
                                        )
                          )}
                          </select>
                        </div>
                        <div>
                          RM{item.price}
                        </div>
                        <div>
                          <button type="button" onClick={() => removeFromCartHandler(item.product)}>Delete</button>
                        </div>
                      </div>
                    </li>
                  ))
                }
                </ul>
              )
            }
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                <h2>
                  
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : RM
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
                </li>
                <li>
                  <button className="primart block" type="button" onClick={() => checkoutHandler()} disabled={cartItems.length === 0}>
                    Proceed to Check Out
                  </button>
                </li>
              </ul>
            </div>
          </div>    
        </div>

    );
}

export default CartScreen
