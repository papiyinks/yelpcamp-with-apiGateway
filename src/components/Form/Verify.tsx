import React, { useState, SyntheticEvent } from 'react';
import Router from 'next/router';
import axios from '../../axios-order';
import Navbar from '../Navbar';

const Verify = () => {
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCode(event.target.value);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const data = {
      email,
      code,
    };

    axios
      .post('/verify', data)
      .then(response => {
        Router.push('/campgrounds');
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>Verification of account</h1>
        <p style={{ textAlign: 'center' }}>
          <em>Check your email to get the verification code</em>
        </p>
        <div style={{ width: '40%', margin: '25px auto' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                required
                type="email"
                placeholder="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                required
                placeholder="verification code"
                onChange={handleCodeChange}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Verify;
