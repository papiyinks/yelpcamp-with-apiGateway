import React, { useState, SyntheticEvent } from 'react';
import Router from 'next/router';
import axios from '../../axios-order';
import Navbar from '../Navbar';
import cookie from 'js-cookie';

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    axios
      .post('/login', data)
      .then(response => {
        if (response.data) {
          cookie.set('token', response.data.idToken);
          cookie.set('user', JSON.stringify(response.data));
          Router.push('/campgrounds');
        } else {
          console.log('Login Error');
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  if (cookie.get('token')) {
    Router.push('/campgrounds');
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <div style={{ width: '30%', margin: '25px auto' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="email"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                required
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
