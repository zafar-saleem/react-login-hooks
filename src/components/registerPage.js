import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { registerUserAction } from '../actions/authenticationActions';

const RegisterPage = () => {
  const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState('');
  const dispatch = useDispatch();
  const register = useSelector(state => state.register.response);

  useEffect(() => {
    if (register !== undefined) {
      setSuccess(register.success);
      setNotification(register.message);
    }
  }, [register]);

  const onHandleRegistration = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    dispatch(registerUserAction({
      name,
      email,
      password,
    }));
  }

  useEffect(() => {
    setNotification('');
  }, []);

  return (
    <div>
      <h3>RegisterPage</h3>
      {(!success || success) ? <div>{notification}</div> : ''}
      <form onSubmit={onHandleRegistration}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <button>Register</button>
        </div>
      </form>
      Already have account? <Link to='login'>Login here</Link>
    </div>
  );
}

export default RegisterPage;
