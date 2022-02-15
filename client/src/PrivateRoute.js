import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './action/authActions';

function PrivateRoute({ component: Component, ...rest }) {
  // console.log('location in private route', location);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  useEffect(()=>{
    if(auth && !auth.user)
    dispatch(loadUser(auth))
  },[])
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuth ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default hot(PrivateRoute);
