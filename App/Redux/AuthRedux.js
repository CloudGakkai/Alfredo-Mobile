import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  doLoginRequest: ['data'],
  doLoginSuccess: ['data'],
  doLoginFailure: ['error'],

  doRegisterRequest: ['data'],
  doRegisterSuccess: ['data'],
  doRegisterFailure: ['error'],
  
  doLogoutRequest: ['data'],
  doLogoutSuccess: ['data'],
  doLogoutFailure: ['error']
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  doLogin: { data: null, fetching: false, error: null },
  doRegister: { data: null, fetching: false, error: null },
  doLogout: {data: null, fetching: false, error: null},
})

export const doLoginRequest = (state, { data }) =>
  state.merge({ ...state, doLogin: { ...state.doLogin, fetching: true, error: null } })
export const doLoginSuccess = (state, { data }) =>
  state.merge({ ...state, doLogin: { ...state.doLogin, data, fetching: false, error: null } })
export const doLoginFailure = (state, { error }) =>
  state.merge({ ...state, doLogin: { ...state.doLogin, fetching: false, error } })

  export const doRegisterRequest = (state, { data }) =>
  state.merge({ ...state, doRegister: { ...state.doRegister, fetching: true, error: null } })
export const doRegisterSuccess = (state, { data }) =>
  state.merge({ ...state, doRegister: { ...state.doRegister, data, fetching: false, error: null } })
export const doRegisterFailure = (state, { error }) =>
  state.merge({ ...state, doRegister: { ...state.doRegister, fetching: false, error } })

export const doLogoutRequest = (state, { data }) =>
  state.merge({ ...state, doLogout: { ...state.doLogout, fetching: true, error: null } })
export const doLogoutSuccess = (state, { data }) =>
  state.merge({ ...state, doLogout: { ...state.doLogout, data, fetching: false, error: null } })
export const doLogoutFailure = (state, { error }) =>
  state.merge({ ...state, doLogout: { ...state.doLogout, fetching: false, error } })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DO_LOGIN_REQUEST]: doLoginRequest,
  [Types.DO_LOGIN_SUCCESS]: doLoginSuccess,
  [Types.DO_LOGIN_FAILURE]: doLoginFailure,

  [Types.DO_REGISTER_REQUEST]: doRegisterRequest,
  [Types.DO_REGISTER_SUCCESS]: doRegisterSuccess,
  [Types.DO_REGISTER_FAILURE]: doRegisterFailure,

  [Types.DO_LOGOUT_REQUEST]: doLogoutRequest,
  [Types.DO_LOGOUT_SUCCESS]: doLogoutSuccess,
  [Types.DO_LOGOUT_FAILURE]: doLogoutFailure,
})
