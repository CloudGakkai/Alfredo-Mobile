import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveSession: ['data'],
  clearSession: null,
})

export const SessionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null
})

export const saveSession = (state, { data }) => 
  state.merge({ ...state, user: data })

export const clearSession = (state) => 
  state.merge({ ...state, user: null })
  
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_SESSION]: saveSession,
  [Types.CLEAR_SESSION]: clearSession,
})
