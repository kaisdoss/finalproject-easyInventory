import axios from 'axios';
import {
  ADD_PRODUCT_FAILED,
  ADD_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILED,
  GET_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILED,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  DELETE_PRODUCT_SUCCESS,
  ADD_FACTURE_FAILED,
  ADD_FACTURE_SUCCESS,
  GET_FACTURE_FAILED,
  GET_FACTURE_SUCCESS,
  UPDATE_FACTURE_FAILED,
  UPDATE_FACTURE_SUCCESS,
  DELETE_FACTURE_FAILED,
  DELETE_FACTURE_SUCCESS,
  POST_INVOICE_SUCCESS,
  POST_INVOICE_FAILED,
  UPDATE_COUNT,
  // GET_FACTURE_BY_ID_FAILED,
  // GET_FACTURE_BY_ID_SUCCESS,
  INCREMENT,
  DECREMENT,
  RESET,
} from './types';

//Actions of Facture
// 1-Add Facture Action
export const addFacture = (facture) => (dispatch) => {
  console.log("factureaction", facture);

  axios
    .post(`${process.env.API_URL}/facture/addFacture`, facture)
    .then((res) =>
      dispatch({
        type: ADD_FACTURE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADD_FACTURE_FAILED,
        payload: err.response.data.errors,
      })
    );
};
//2-Get Facture Action
export const getFacture = () => (dispatch) => {
  axios
    .get(`${process.env.API_URL}/facture/allFacture`)
    .then((res) =>
      dispatch({
        type: GET_FACTURE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_FACTURE_FAILED,
        payload: err.response.data.errors,
      })
    );
};

// Post Facture
export const postInvoice = (salesList) => (dispatch) => {
  console.log(salesList)
  axios
    .post(`${process.env.API_URL}/facture/postInvoice`,salesList)
    .then((res) =>
      dispatch({
        type: POST_INVOICE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: POST_INVOICE_FAILED,
        payload: err.response.data.errors,
      })
    );
};

////////////
// export const getFactureById = (id) => (dispatch) => {
//   axios
//     .get(`${process.env.API_URL}/facture/getFactureV2/${id}`)
//     .then((res) =>
//       dispatch({
//         type: GET_FACTURE_BY_ID_SUCCESS,
//         payload: res.data,
//       })
//     )
//     .catch((err) =>
//       dispatch({
//         type: GET_FACTURE_BY_ID_FAILED,
//         payload: err.response.data.errors,
//       })
//     );
// };
//3-Update Facture Action
export const updateFacture = (facture) => (dispatch) => {
  axios
    .put(`${process.env.API_URL}/facture/updateFacture`, facture)
    .then((res) =>
      dispatch({
        type: UPDATE_FACTURE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATE_FACTURE_FAILED,
        payload: err.response.data.errors,
      })
    );
};
//4-Delete Facture Action
export const deleteFacture = (id) => (dispatch) => {
  axios
    .delete(`${process.env.API_URL}/facture/deleteFacture/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_FACTURE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: DELETE_FACTURE_FAILED,
        payload: err.response.data.errors,
      })
    );
};

//Actions of Product
// 1-Add Product Action
export const addProduct = (product) => (dispatch) => {
  axios
    .post(`${process.env.API_URL}/products/addProduct`, product)
    .then((res) =>
      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADD_PRODUCT_FAILED,
        payload: err.response.data.errors,
      })
    );
};
//2-Get Product Action
export const getProduct = () => (dispatch) => {
  axios
    .get(`${process.env.API_URL}/products/salePage`)
    .then((res) =>
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PRODUCT_FAILED,
        payload: err.response.data.errors,
      })
    );
};
//3-Update Product Action
export const updateProduct = (id, product) => (dispatch) => {
  console.log('1 - Product In Action: ', product);
  axios
    .put(`${process.env.API_URL}/products/updateProduct/${id}`, product)
    .then((res) => {
      console.log('This Is Result:', res);
      return dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: UPDATE_PRODUCT_FAILED,
        payload: err.response.data.errors,
      })
    );
};
//4-Delete Product Action
export const deleteProduct = (id) => (dispatch) => {
  axios
    .delete(`${process.env.API_URL}/products/deleteproduct/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: DELETE_PRODUCT_FAILED,
        payload: err.response.data.errors,
      })
    );
};

export const incrementCount = (id) => {
  //  console.log("id: !!",id);
  return {
    type: INCREMENT,
    payload: id,
  };
};
export const decrementCount = (id) => ({
  type: DECREMENT,
  payload: id,
});
export const resetCount = (id) => ({
  type: RESET,
  payload: id,
});

export const updateTotalCount = (id) => ({
  type: UPDATE_COUNT,
  payload: id
})