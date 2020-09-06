import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveSession: ['data'],
  clearSession: null,

  getProfileRequest: ['data'],
  getProfileSuccess: ['data'],
  getProfileFailure: ['error'],
})

export const SessionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  profile: { data: null, fetching: false, error: null }
})

export const SessionSelectors = {
  selectUser: state => state.session.user
}

export const saveSession = (state, { data }) =>
  state.merge({ ...state, user: data })

export const clearSession = (state) =>
  state.merge({ ...state, user: null })

export const getProfileRequest = (state, { data }) =>
  state.merge({ ...state, profile: { ...state.profile, fetching: false, error: null } })
export const getProfileSuccess = (state, { data }) =>
  state.merge({ ...state, profile: { ...state.profile, data, fetching: false, error: null } })
export const getProfileFailure = (state, { error }) =>
  state.merge({ ...state, profile: { ...state.profile, fetching: false, error } })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_SESSION]: saveSession,
  [Types.CLEAR_SESSION]: clearSession,

  [Types.GET_PROFILE_REQUEST]: getProfileRequest,
  [Types.GET_PROFILE_SUCCESS]: getProfileSuccess,
  [Types.GET_PROFILE_FAILURE]: getProfileFailure,
})
