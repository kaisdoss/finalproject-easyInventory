import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from './action/authActions';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div>
     
      {auth.isAuth ? (
        <>
          <Link to="/profile">Profil</Link>
          {/* {auth?.user?.role !== 'Stock Manager' && ( */}
            <Link to="/facture">Manage Invoice</Link>
          {/* )} */}
          {/* {auth?.user?.role !== 'Cashier' && ( */}
            <Link to="/products">Manage Product</Link>
          {/* )} */}
          {auth?.user?.role !== ('Cashier'||'Stock Manager' ) && (
            <Link to="/dashboard">Dashboard</Link>
          )}
          <Link to="" onClick={() => dispatch(logoutUser())}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}

export default hot(NavBar);
