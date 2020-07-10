import axios from "axios";

import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,


} from "../constants/userConstants";
import { USER_SERVER } from "../configs";

const registerUser = (dataToSubmit) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST, payload: dataToSubmit });
  try {
    const response = await axios.post(`${USER_SERVER}/register`, dataToSubmit);
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: USER_SIGNUP_FAIL, payload: error.response.data.error });
  }
};

const signInUser = (dataToSubmit) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: dataToSubmit });
  try {
    const response = await axios.post(`${USER_SERVER}/login`, dataToSubmit);
    localStorage.setItem("userId", response.data.userId)
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};


export { registerUser, signInUser };
