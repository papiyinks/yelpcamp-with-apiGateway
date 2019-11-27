import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from '../../axios-order';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

export interface IntProps {
  userId: string | null;
  obj: {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    owner: string;
  };
}

const Table = (props: IntProps) => {
  const router = useRouter();
  const { id } = router.query;

  const deleted = () => {
    const token = cookie.get('token');

    axios
      .delete(`/campground/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(response => {
        Router.push('/campgrounds');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-9">
          <div className="thumbnail">
            <img
              style={{ width: '100%' }}
              alt=""
              className="img-responsive"
              src={props.obj.image}
            />
            <div className="caption-full">
              <h4 className="pull-right">₦{props.obj.price}</h4>
              <h4>{props.obj.name}</h4>
              <p>{props.obj.description}</p>
              {props.userId === props.obj.owner && (
                <p>
                  <Link
                    href={`/edit?id=${props.obj.id}`}
                    as={`/edit/${props.obj.id}`}
                  >
                    <a className="btn btn-primary">Edit</a>
                  </Link>
                  <button
                    onClick={deleted}
                    style={{ marginLeft: '10px' }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
