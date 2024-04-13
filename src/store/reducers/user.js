import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
  } from '../../constants/actions'
  
  const user = JSON.parse(localStorage.getItem('user'))
  
  const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
    const { type, payload } = action
  
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user?.user,
          success:payload.success,
          error:null
        }
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
          success:null,
          error: payload.error
        }
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user?.user,
          success: payload.success,
          error: null
        }
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
          token: null,
          success:null,
          error: payload.error
        }
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
          token: null
        }
      default:
        return state
    }
  }
  