
import { hot } from "react-hot-loader/root";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../action/authActions";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import "../assest/scss/login.css"
import { Link } from 'react-router-dom';
import Avatar from './Avatar'


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));



function Login({ history }) {
  const classes = useStyles();

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [passwordError, setpasswordError] = useState("")
  const [emailError, setemailError] = useState("")
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const auth = useSelector((state) => state.auth);
  // console.log("authLogibn", auth.failed);
  useEffect(() => {
    // console.log("useEffect");

    if (auth.isAuth) {
      history.push("/profile");
    }
  }, [auth.isAuth]);



  const loginNow = (e) => {
    e.preventDefault();
    dispatch(loginUser(info));
    // console.log("info", info, auth.errors[0].msg);
    if (auth.isAuth) {
      history.push("/profile");
    }else if (auth.errors[0].msg==="Wrong Password!") {
      setpasswordError("Le mot de passe entré est incorrect. Vous l’avez oublié ?")
    }else if (auth.errors[0].msg="Please Register Before!") {
      setemailError("L’adresse e-mail que vous avez saisi(e) n’est pas associé(e) à un compte.")
    }
  };


  return (


    <div className="loginContainer">


      <div className='login-component' >
        <div className='design-moyen-orange-top' ></div>
        <div className='design-white-top' ></div>
        <div className='design-oragne-left-top' ></div>
        <div className='design-oragne-right-top' ></div>


        <div className="login-form">
          <Avatar
            width="180"
            height="195"
          />

          <form className="container-form" onSubmit={loginNow}>
            <FormControl className="form-control" >
              <label className='label-Name' htmlFor="">Email</label>
              {/* <InputLabel  id="InputLogin"  htmlFor="input-with-icon-adornment">Email</InputLabel> */}
              <input className={emailError===""? 'inputLogin':'inputLoginerr' }
                placeholder="Enter Your Email"
                type="text"
                name="email"
                onChange={handleChange}
                id="input-with-icon-adornment"

              />
                  <p className="login-err" >{emailError}</p>
            </FormControl>
            <FormControl className="form-control">
              <label className='label-Name' htmlFor="input-with-icon-adornment">Password</label>
              <input className={passwordError===""? 'inputLogin':'inputLoginerr' }
                placeholder="Enter Your Password"
                type="password"
                name="password"
                onChange={handleChange}
                id="input-with-icon-adornment" />
              <p className="login-err" >{passwordError}</p>
            </FormControl>
            <button className="loginButton btn" type="submit" >
              Login
            </button>
          </form>
        </div>

        <div className='design-moyen-orange-bottom' ></div>
        <div className='design-white-bottom' ></div>
        <div className='design-oragne-left-bottom' ></div>
        <div className='design-oragne-right-bottom' ></div>

      </div>
    </div>
  );
}

export default hot(Login);
