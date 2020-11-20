import React, { useEffect } from 'react'
import Product from "../components/Product";
//import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

function HomeScreen() {
  //not required for redux
  //const [products, setProducts] = useState([]); //react hook
  //const [loading, setLoading] = useState(false); //react hook
  //const [error, setError] = useState(false); //react hook

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {products,loading,error} = productList; //assign to 3 variables


  //console.log("sadas",productList);
  //const loading = true;


  /* //not required fot redux
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setLoading(false);
        setProducts(data);
      }
      catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  */
 useEffect(() => {
    //dispatch(listProducts());
    dispatch(listProducts());
 },[dispatch]);




  return (
    <div>
      {
        loading ? 
        (
          <LoadingBox></LoadingBox>
        )
        :
        error ? 
        (
          <MessageBox variant="danger">{error}</MessageBox>
        )
        : 
        (
          <div className="row center">
          {
            products.map(product => (
              <Product key={product._id} product={product}></Product>
              ))
          }
          </div>
        )
      }
    </div>
  );
}
export default HomeScreen
