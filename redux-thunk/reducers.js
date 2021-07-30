import { combineReducers } from "redux";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SET_CURRENTUSER
  
} from "./types";
import adminReducer from '../components/admin/reducers/reducer'
import consultantReducer from '../components/consultant/redux/reducer'
import clientReducer from '../components/user/redux/reducer'
const userState = {
  user: {},
  userDetail:{},
  error: {},
}

const userReducer = (state = userState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        error: payload,
      };
    case SET_CURRENTUSER:
      // console.log(payload);
      return {
        ...state,
        userDetail: payload,
      };
   
    default:
      return state;
  }
};



const reducers = {
  userReducer: userReducer,
  adminReducer:adminReducer,
  consultantReducer:consultantReducer,
  clientReducer:clientReducer
};

export default combineReducers(reducers);
