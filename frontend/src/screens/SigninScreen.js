import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function SigninScreen(props) {
    
    const onSubmitHandler = ((e) =>{
        e.preventDefault();
        dispatch(signin(email,password));
        //
    })

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
    //const redirect = '/shipping';
    //alert(redirect)

    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo,loading,error} = userSignIn;

    useEffect(() => {
        if (userInfo) {
            //alert(redirect)
          props.history.push(redirect);
        }
        else{
            //alert('fsfff')
        }
       //alert('fsfff',userInfo)
      }, [props.history, redirect, userInfo]);

    const dispatch = useDispatch();

    
    return (
        <div>
           <form className="form" onSubmit={onSubmitHandler}>
            <div>
                <h1>Sign in</h1>
            </div>




        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

            <div>
                <label htmlFor="email">Email</label>
                <div>
                    <input id="email" type="email" placeholder="enter email" required
                    onChange={(e => setEmail(e.target.value))}>    
                    </input>
                </div>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <div>
                    <input id="password" type="password" placeholder="enter password" required
                    onChange={(e => setPassword(e.target.value))}>    
                    </input>
                </div>
            </div>
            <div>
                <label/>
                <button className="primary" type="submit">Sign In</button>
            </div>
            <div>
                <label/>
                <div>
                    New Customer? {' '}
                    <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                </div>
            </div>
            </form> 
        </div>
    );
}

export default SigninScreen
