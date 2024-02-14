import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/authReducer';
import Nav from './nav';
import FormLogin from './formLogin';
import Footer from './footer';

function Login() {
    const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
    return (
        <div className='screen'>
            <Nav />
            <FormLogin />
            <Footer />
        </div>

    );
}

export default Login;