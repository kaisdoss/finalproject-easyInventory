import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from './types';
import axios from 'axios';
import SetToken from '../SetToken';

export const registerUser = (info) => (dispatch) => {
  console.log('info', info);
  axios
    .post(`${process.env.API_URL}/register`, info)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const loginUser = (info) => (dispatch) => {
  axios
    .post(`${process.env.API_URL}/login`, info)
    .then((res) =>
    
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const loadUser = (auth) => (dispatch) => {
  if (auth.token) {
    SetToken();
  }
  axios
    .get(`${process.env.API_URL}/login`)
    .then((res) =>
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_USER_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
