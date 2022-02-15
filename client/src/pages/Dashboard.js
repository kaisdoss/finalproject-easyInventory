import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../action/authActions';
import { Link } from 'react-router-dom';
import SalesPage from './cashier/SalesPage';

function Dashboard() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.user?.role !== 'Admin') {
      dispatch(loadUser(auth));
    }
  }, []);

  return (
    <div>
      <Link to="/register">Register</Link>
      <h1></h1>
      {/* <SalesPage/> */}
      <br />
      <Link to="/users/allUsers">Users</Link>
    </div>
  );
}

export default hot(Dashboard);
