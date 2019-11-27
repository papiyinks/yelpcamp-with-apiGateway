import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';

import axios from '../../axios-order';
import Table from './Table';
import Navbar from '../Navbar';

export interface IntCamp {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  owner: string;
}

type ShowProps = {
  id: string;
};

export interface IntUser {
  sub: string;
}

const Show = ({ id }: ShowProps) => {
  const [campground, setCampground] = useState<IntCamp | null>(null);

  const [user, setUser] = useState<IntUser | null>(null);

  useEffect(() => {
    const authUser = cookie.get('user');
    if (authUser) {
      setUser(JSON.parse(authUser));
    }

    axios
      .get(`/campground/${id}`)
      .then(response => {
        setCampground(response.data.campground);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return (
      campground && (
        <Table
          obj={campground}
          userId={user ? user.sub : ''}
          key={campground.id}
        />
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">{tabRow()}</div>;
    </>
  );
};

export default Show;
