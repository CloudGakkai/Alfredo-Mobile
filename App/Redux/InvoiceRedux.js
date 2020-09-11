import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  showInvoiceRequest: ['data'],
  showInvoiceSuccess: ['data'],
  showInvoiceFailure: ['error']
})

export const InvoiceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  show: { data: {}, fetching: false, error: null }
})

/* ------------- Reducers ------------- */

export const showInvoiceRequest = (state, { data }) =>
  state.merge({ ...state, show: { ...state.show, fetching: true, error: null}})
export const showInvoiceSuccess = (state, { data }) =>
  state.merge({ ...state, show: { ...state.show, data, fetching: false, error: null}})
export const showInvoiceFailure = (state, { error }) =>
  state.merge({ ...state, show: { ...state.show, fetching: false, error}})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SHOW_INVOICE_REQUEST]: showInvoiceRequest,
  [Types.SHOW_INVOICE_SUCCESS]: showInvoiceSuccess,
  [Types.SHOW_INVOICE_FAILURE]: showInvoiceFailure,
})
