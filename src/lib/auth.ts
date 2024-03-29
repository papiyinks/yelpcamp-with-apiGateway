import Router from 'next/router';
import { NextPageContext } from 'next';
import cookie from 'js-cookie';
import { IntUser } from '../components/Campgrounds/Show';

export const authInitialProps = (isProtectedRoute: boolean, path: string) => ({
  res,
}: NextPageContext) => {
  const isAuthenticated = checkIfAuthenticated();

  if (isProtectedRoute && !isAuthenticated) {
    return redirectUser(res, path);
  }

  return { isAuthenticated };
};

export const checkIfAuthenticated = (): boolean => {
  const auth = cookie.get('token');

  return auth ? true : false;
};

export const getUserFromCookie = (): IntUser | null => {
  const authUser = cookie.get('token');

  return authUser ? JSON.parse(authUser) : null;
};

const redirectUser = (res: any, path: string) => {
  if (res) {
    res.redirect(302, path);
  }
  Router.replace(path);
};
