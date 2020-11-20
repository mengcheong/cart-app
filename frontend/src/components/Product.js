import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

//main screen
function Product(aa) {
    const {product} = aa;
    return (
        <div key={product._id} className="card">
        <Link to={`/product/${product._id}`}>
          
          <img className="medium" src={product.image} alt={product.name} />
        </Link>
        <div className="card-body">
          <Link to={'/product/' + product._id}>
            <h2>{product.name.slice(0,product.name.length)}</h2>
          </Link>
          <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
          <div className="price">RM{product.price}</div>
        </div>
      </div>
    )
}

export default Product
