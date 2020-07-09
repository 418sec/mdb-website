import axios from "axios";

import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
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

export { registerUser };
