import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'


const { Types, Creators } = createActions({
  confirmPaymentRequest: ['data'],
  confirmPaymentSuccess: ['data'],
  confirmPaymentFailure: ['error']
})

export const ConfirmPaymentTypes = Types
export default Creators


export const INITIAL_STATE = Immutable({
  data: {},
  fetching: false,
  error: null
})

export const confirmPaymentRequest = (state, { data }) =>
  state.merge({ ...state, fetching: true, error: null })
export const confirmPaymentSuccess = (state, { data }) =>
  state.merge({ ...state, data, fetching: false, error: null })
export const confirmPaymentFailure = (state, { error }) =>
  state.merge({ ...state, fetching: false, error })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONFIRM_PAYMENT_REQUEST]: confirmPaymentRequest,
  [Types.CONFIRM_PAYMENT_SUCCESS]: confirmPaymentSuccess,
  [Types.CONFIRM_PAYMENT_FAILURE]: confirmPaymentFailure
})
