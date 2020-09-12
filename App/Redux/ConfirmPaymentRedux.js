import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'


const { Types, Creators } = createActions({
  confirmPaymentRequest: ['data'],
  confirmPaymentSuccess: ['payload'],
  confirmPaymentFailure: null
})

export const ConfirmPaymentTypes = Types
export default Creators


export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONFIRM_PAYMENT_REQUEST]: request,
  [Types.CONFIRM_PAYMENT_SUCCESS]: success,
  [Types.CONFIRM_PAYMENT_FAILURE]: failure
})
