
import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../action/authActions';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import "./register.css"
import addFreindss from '.././assest/images/addFreindss.png'


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function Register({ history }) {
  const classes = useStyles();
  const [info, setInfo] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    role: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const registerNow = (e) => {
    e.preventDefault();
    dispatch(registerUser(info));
  };
  return (
    <div className='register' >
      <div className="taswira">
        <div style={{marginTop:'1rem',marginLeft:"3rem"}}>
          <span className='nv-membre' >Nouveau membre </span>
        <p className="underline"></p>
        </div>
      
        <img src={addFreindss} alt="addFreinds" className='register-img' />
      </div>

      <form className='form-register' onSubmit={registerNow}>
       
        <div className='grid-form'>
          <Grid direction="column" container spacing={3}>

            <Grid item>
              <span className="title">Prénom</span>
              <Paper className={classes.paper} style={{ marginTop: "1rem " }}>
                <input
                  style={{ borderRadius: "15px" }}
                  placeholder="Enter Your First Name"
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                />
              </Paper>
            </Grid>

            <Grid item>
              <span className="title">Nom</span>
              <Paper className={classes.paper} style={{ marginTop: "1rem " }}>
                <input
                  style={{ borderRadius: "15px" }}
                  placeholder="Enter Your Last Name"
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                />
              </Paper>
            </Grid>

            <Grid item>
              <span className="title">Numéro</span>
              <Paper className={classes.paper} style={{ marginTop: "1rem " }}>
                <input
                  style={{ borderRadius: "15px" }}
                  placeholder="Enter Your Phone"
                  type="text"
                  name="phone"
                  onChange={handleChange}
                />
              </Paper>
            </Grid>

            <Grid item>
              <span className="title">Email</span>
              <Paper className={classes.paper} style={{ marginTop: "1rem " }}>
                <input
                  style={{ borderRadius: "15px" }}
                  placeholder="Enter Your Email"
                  type="text"
                  name="email"
                  onChange={handleChange}
                />
              </Paper>
            </Grid>
            <Grid item>
              <span className="title">Mot de passe</span>
              <Paper className={classes.paper} style={{ marginTop: "1rem " }} >
                <input
                  style={{ borderRadius: "15px" }}
                  placeholder="Enter Your Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
        <div style={{ marginTop: "2rem ", display: "flex", alignItems: "center" }}>
          {/* <Grid item> */}
          <span className="title" style={{ marginRight: "2rem " }}>Role</span>
          <Paper className={classes.paper}  >
            <select name="role" onChange={handleChange} value={info.role} style={{ height: "4rem ", width: "20rem", borderRadius: "15px" }}>
              <option value="null">Select a role</option>
              <option value="Manager">Manager</option>
              <option value="Cashier">Cashier</option>
              <option value="Stock Manager">Stock Manager</option>
            </select>
          </Paper>
          <span className="title" style={{ marginRight: "2rem ", marginLeft: '1rem' }}>Sexe</span>
          <Paper className={classes.paper}  >
            <select name="role" onChange={handleChange} value={info.role} style={{ height: "4rem ", width: "20rem", borderRadius: "15px" }}>

              <option value="Manager">Femme</option>
              <option value="Cashier">Homme</option>
            </select>
          </Paper>
        </div>

        {/* <button className="RegisterForm" type="submit">
          Register
        </button> */}
        <button class="registerButton btn" type="submit">Register</button>
      </form>
    </div>
  );
}

export default hot(Register);
