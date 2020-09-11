import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  makeOrderRequest: ['data'],
  makeOrderSuccess: ['data'],
  makeOrderFailure: ['error']
})

export const OrderTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: null
})

export const makeOrderRequest = (state, { data }) =>
  state.merge({ ...state, fetching: true, error: null })
export const makeOrderSuccess = (state, { data }) =>
  state.merge({ ...state, data, fetching: false, error: null })
export const makeOrderFailure = (state, { error }) =>
  state.merge({ ...state, fetching: false, error })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MAKE_ORDER_REQUEST]: makeOrderRequest,
  [Types.MAKE_ORDER_SUCCESS]: makeOrderSuccess,
  [Types.MAKE_ORDER_FAILURE]: makeOrderFailure
})