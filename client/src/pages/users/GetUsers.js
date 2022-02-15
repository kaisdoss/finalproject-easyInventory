import { hot } from 'react-hot-loader/root';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUsers } from "../../action/userActions";
import { Link } from "react-router-dom";
import './users.css'



function GetUsers({ history }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usersRed.user);
  const userLenght = useSelector((state) => state.usersRed.userLenght);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      <p className="countUsers"> {userLenght} utilisateurs</p>
      <div>
        <div className='container'>
        <div>
          <span className='all' >Tous</span>
          
        </div>
        <div className="pseudo-search">
          <input type="text" className='input-search'  placeholder="chercher..." autofocus required />

          <button className="fa fa-search" type="submit"></button>
        </div>
       </div>
       <div className="active-tabs"></div>
       <div className="line"></div>
      </div> 
      
      {/* <button onClick={() => history.goBack()}>Back</button> */}
      <div className='all-users' >
        {user && user.map((user) => (
          <div className="card" key={user._id}>
            <i className="fal fa-trash-alt dots" onClick={() => dispatch(deleteUsers(user._id))}></i>
            {/* <i className="fal fa-ellipsis-v dots"></i> */}
            <div className="circle-user">
              <div className="contour-circle">
                <i class="fal fa-user icon-user"></i>
              </div>

            </div>
            <div className='details'>
              <p className='detail-user' >{user.firstname} {user.lastname}</p>
              <p className='detail-user' >{user.email}</p>
              <p className='detail-user-role' >{user.role}</p>


            </div>
            <div className="card-bottom">
              <Link to={`/users/updateUser/${user._id}`}> <span className='update-user'>Mettre à jour</span></Link>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default hot(GetUsers);
