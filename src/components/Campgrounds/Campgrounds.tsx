import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from '../../axios-order';
import Navbar from '../Navbar';
import Body from './Body';
import cookie from 'js-cookie';

const Campgrounds = () => {
  const [campground, setCampground] = useState<[]>([]);

  useEffect(() => {
    axios
      .get('/campgrounds')
      .then(response => {
        setCampground(response.data.campgrounds);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return (
      campground &&
      campground.map(function(object, i) {
        return <Body obj={object} key={i} />;
      })
    );
  };

  const user = cookie.get('token');

  return (
    <>
      <Navbar />
      <div style={{ marginBottom: '10px' }} className="container">
        <header className="jumbotron">
          <div className="container">
            <h1>Welcome To YelpCamp</h1>
            <p>View our hand picked campgrounds from all over the world</p>
            {!user ? (
              <div></div>
            ) : (
              <p>
                <Link href="/new" as="/new">
                  <a className="btn btn-primary btn-lg">Add New Campground</a>
                </Link>
              </p>
            )}
          </div>
        </header>

        <div
          className="row text-center"
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {tabRow()}
        </div>
      </div>
    </>
  );
};

export default Campgrounds;
