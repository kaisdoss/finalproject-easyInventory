import axios from "axios";
import {
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_SUCCESS,
} from "./types";

//1-Get Facture Action
export const getUsers = () => (dispatch) => {
  axios
    .get(`${process.env.API_URL}/user/allUsers`)
    .then((res) =>
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_USER_FAILED,
        payload: err.response.data.errors,
      })
    );
};
//2-Update Users Action
export const updateUsers = (user) => (dispatch) => {
  axios
    .put(`${process.env.API_URL}/user/updateUser/${id}`, user)
    .then((res) =>
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATE_USER_FAILED,
        payload: err.response.data.errors,
      })
    );
};
//3-Delete Users Action
export const deleteUsers = (id) => (dispatch) => {
  axios
    .delete(`${process.env.API_URL}/user/deleteUser/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: DELETE_USER_FAILED,
        payload: err.response.data.errors,
      })
    );
};
