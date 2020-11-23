import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function RegisterScreen(props) {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    
    const onSubmitHandler = ((e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and Confirm Password are not match');
        }
        else{
            dispatch(register(name,email,password));
        }
        
        
        //
    })



    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    useEffect(() => {
        if (userInfo) {
          props.history.push(redirect);
        }
      }, [props.history, redirect, userInfo]);

    const dispatch = useDispatch();

    
    return (
        <div>
           <form className="form" onSubmit={onSubmitHandler}>
            <div>
                <h1>Create Account</h1>
            </div>




        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}


            <div>
                <label htmlFor="name">Name</label>
                <div>
                    <input id="name" type="text" placeholder="enter name" required
                    onChange={(e => setName(e.target.value))}>    
                    </input>
                </div>
            </div>
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
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div>
                    <input id="confirmPassword" type="password" placeholder="enter confirm password" required
                    onChange={(e => setConfirmPassword(e.target.value))}>    
                    </input>
                </div>
            </div>
            <div>
                <label></label>
                <button className="primary" type="submit">Register</button>
            </div>
            <div>
                <label></label>
                <div>
                    Already have an account? {' '}<Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                </div>
            </div>
            </form> 
        </div>
    );
}

export default RegisterScreen
