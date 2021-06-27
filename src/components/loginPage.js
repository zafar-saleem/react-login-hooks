import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginUserAction } from '../actions/authenticationActions';
import { setCookie } from '../utils/cookies';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { message = '', success = false, token = '' } = useSelector(state => state.login.response || {});

  useEffect(() => {
    if (message !== undefined && success !== undefined) {
      if (success) {
        setCookie('token', token, 1);
      }
    }
  }, [message, success, token]);

  const onHandleLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    dispatch(loginUserAction({
      email, password,
    }));
  }

  return (
    <div>
      <h3>Login Page</h3>
      {(!success) ? <div>{message}</div> : <Redirect to='dashboard' />}
      <form onSubmit={onHandleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
      Don't have account? <Link to='register'>Register here</Link>
    </div>
  );
};

export default LoginPage;
