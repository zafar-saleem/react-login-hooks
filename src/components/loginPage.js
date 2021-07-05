import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginUserAction } from '../actions/authenticationActions';
import { setCookie } from '../utils/cookies';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState('');
  const [success, setSuccess] = useState(false);
  const login = useSelector(state => state.login.response);

  useEffect(() => {
    if (login !== undefined) {
      setNotification(login.message);
      setSuccess(login.success);
      if (login.success) {
        setCookie('token', login.token, 1);
      }
    }
  }, [login]);

  const onHandleLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    dispatch(loginUserAction({
      email, password,
    }));
  }

  useEffect(() => {
    setNotification('');
    setSuccess(false);
  }, []);

  return (
    <div>
      <h3>Login Page</h3>
      {(!success) ? <div>{notification}</div> : <Redirect to='dashboard' />}
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
