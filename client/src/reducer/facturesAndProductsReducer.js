import {
  ADD_FACTURE_FAILED,
  ADD_FACTURE_SUCCESS,
  ADD_PRODUCT_FAILED,
  ADD_PRODUCT_SUCCESS,
  GET_FACTURE_FAILED,
  GET_FACTURE_SUCCESS,
  // GET_FACTURE_BY_ID_FAILED,
  // GET_FACTURE_BY_ID_SUCCESS,
  GET_PRODUCT_FAILED,
  GET_PRODUCT_SUCCESS,
  UPDATE_FACTURE_FAILED,
  UPDATE_FACTURE_SUCCESS,
  UPDATE_PRODUCT_FAILED,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_FACTURE_FAILED,
  DELETE_FACTURE_SUCCESS,
  DELETE_PRODUCT_FAILED,
  DELETE_PRODUCT_SUCCESS,

  POST_INVOICE_SUCCESS,
  POST_INVOICE_FAILED,
  INCREMENT,
  DECREMENT,
  RESET,
  UPDATE_COUNT
} from '../action/types';

const initState = {
  facture: [],
  errors: null,
  product: [],
  count: 0,
};

const achatReducer = (state = initState, action) => {
  
  switch (action.type) {
    case POST_INVOICE_SUCCESS:
      return {
        ...state,
       facture:[...state.facture, action.payload]
      };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        product: [...state.product, action.payload],
        errors: null,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        errors: null,
        product: action.payload,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: state.product.filter((el) => el._id !== action.payload._id),
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        errors: null,
        product: state.product.map((el) => {
          if (el._id === action.payload._id) return action.payload;
          return el;
        }),
      };
    case GET_FACTURE_SUCCESS:
      return {
        ...state,
        errors: null,
        facture: action.payload,
      };

    // case GET_FACTURE_BY_ID_SUCCESS:
    //   return {
    //     ...state,
    //     facture: action.payload,
    //     errors: null,
    //   };

    case ADD_FACTURE_SUCCESS:
      return {
        ...state,
        facture: [...state.facture, action.payload],
        errors: null,
      };
    case DELETE_FACTURE_SUCCESS:
      return {
        ...state,
        facture: state.facture.filter((el) => el._id !== action.payload._id),
      };
    case UPDATE_FACTURE_SUCCESS:
      return {
        ...state,
        errors: null,
        facture: state.facture.map((el) => {
          if (el._id === action.payload._id) return action.payload;
          return el;
        }),
      };
      case UPDATE_FACTURE_SUCCESS:
        return {
          ...state,
          errors: null,
          facture: state.facture.map((el) => {
            if (el._id === action.payload._id) return action.payload;
            return el;
          }),
        };
    // case GET_FACTURE_BY_ID_FAILED:
    case UPDATE_FACTURE_FAILED:
    case GET_PRODUCT_FAILED:
    case ADD_PRODUCT_FAILED:
    case UPDATE_PRODUCT_FAILED:
    case DELETE_PRODUCT_FAILED:
    case GET_FACTURE_FAILED:
    case ADD_FACTURE_FAILED:
    case DELETE_FACTURE_FAILED:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default achatReducer;
