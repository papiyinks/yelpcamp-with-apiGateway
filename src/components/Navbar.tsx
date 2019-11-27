import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import cookie from 'js-cookie';
import styled from 'styled-components';

const Navbar = (): JSX.Element => {
  const Header = styled.li`
    padding-top: 15px;
    padding-right: 15px;
    padding-left: 15px;
    cursor: pointer;
  `;

  const logout = () => {
    cookie.remove('token');
    cookie.remove('user');
    Router.push('/');
  };

  const user = cookie.get('user');

  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              aria-controls="navbar"
              data-target="#navbar"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link href="/">
              <a className="navbar-brand">YelpCamp</a>
            </Link>
          </div>
          <div
            className="collapse navbar-collapse"
            id="navbar"
            aria-expanded="false"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link href="/campgrounds">
                  <a>Campgrounds</a>
                </Link>
              </li>
              {!user ? (
                <>
                  <li>
                    <Link href="/login">
                      <a>Login</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/register">
                      <a>Signup</a>
                    </Link>
                  </li>
                </>
              ) : (
                <Header onClick={logout}>Logout</Header>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
