
import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../action/authActions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import telechargement from "../assest/images/telechargement.png"
import "../assest/scss/home.css"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



function Home({ history }) {
  const auth = useSelector((state) => state.auth);




  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const classes = useStyles();
  const dispatch = useDispatch();




  return (
    <div>
      <p className='countUsers'>Accueil</p>

      <div className='home-page' >
      <button className='add btn' >
      <Link to="/register"> <span  style={{color:'white'}} >Register</span> </Link>

        </button> 
        <img src={telechargement} alt="" />
      </div>
    </div>
  );
}

export default hot(Home);
