import { createBrowserHistory } from 'history';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REFRESH_TOKEN,
} from "../../constants/actions";

import axios from "axios";
 const history = createBrowserHistory();
const SIGNUP_URL = process.env.SIGNUP_URL || "http://192.168.1.1:8100/api/signup";
const SIGNIN_URL = process.env.SIGNIN_URL || "http://192.168.1.1:8100/api/signin";

export const register =
  ({ username, password, role }) =>
  async (dispatch) => {
    try {
      await axios
        .post(SIGNUP_URL, {
          username: username,
          password: password,
          role: role,
        })
        .then(function (response) {
          if (response.data.token) {
            localStorage.setItem("user-veto", JSON.stringify(response.data.token));
          }
          dispatch({
            type: REGISTER_SUCCESS,
            payload: {
              user: response.data,
              success: "success operation",
              error: null,
            },
          });
           history.push('/');
        })
        .catch(function (error) {
          dispatch({
            type: REGISTER_FAIL,
            payload: {
              user: null,
              success: null,
              error: error,
            },
          });
        });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          user: null,
          success: null,
          error: error,
        },
      });
    }
  };

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    await axios
      .post(SIGNIN_URL, {
        username: username,
        password: password,
      })
      .then(function (response) {
        if (response.data.token) {
          localStorage.setItem("user-veto", JSON.stringify(response.data.token));
        }
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: response.data,
            success: "success operation",
            error: null,
          },
        });
        history.push('/');
      })
      .catch(function (error) {
        dispatch({
          type: LOGIN_FAIL,
          payload: {
            success: null,
            error: error?.response?.data?.error,
          },
        });
      });
  };
export const refreshToken = (accessToken) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN,
    payload: accessToken,
  });
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("user-veto");
  dispatch({
    type: LOGOUT,
  });
};
