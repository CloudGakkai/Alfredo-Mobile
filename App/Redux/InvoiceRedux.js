import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getInvoiceRequest: ['data'],
  getInvoiceSuccess: ['data'],
  getInvoiceFailure: ['error'],

  moreInvoiceRequest: ['data'],
  moreInvoiceSuccess: ['data'],
  moreInvoiceFailure: ['error'],

  showInvoiceRequest: ['data'],
  showInvoiceSuccess: ['data'],
  showInvoiceFailure: ['error']
})

export const InvoiceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: { data: [], fetching: false, error: null, page: 1, lastPage: 1, isLoadMore: false },
  show: { data: { status: '' }, fetching: false, error: null }
})

/* ------------- Reducers ------------- */

export const getInvoiceRequest = (state, { data }) =>
  state.merge({ ...state, list: { ...state.list, fetching: true, error: null } })
export const getInvoiceSuccess = (state, { data }) =>
  state.merge({ ...state, list: { ...state.list, data: data.data, page: 1, lastPage: data.lastPage, fetching: false, error: null } })
export const getInvoiceFailure = (state, { error }) =>
  state.merge({ ...state, list: { ...state.list, fetching: false, error } })

export const moreInvoiceRequest = (state, { data }) =>
  state.merge({ ...state, list: { ...state.list, isLoadMore: true, error: null } })
export const moreInvoiceSuccess = (state, { data }) =>
  state.merge({ ...state, list: { ...state.list, data: [...state.list.data, ...data.data], page: data.page, isLoadMore: false, error: null } })
export const moreInvoiceFailure = (state, { error }) =>
  state.merge({ ...state, list: { ...state.list, isLoadMore: false, error } })

export const showInvoiceRequest = (state, { data }) =>
  state.merge({ ...state, show: { ...state.show, fetching: true, error: null}})
export const showInvoiceSuccess = (state, { data }) =>
  state.merge({ ...state, show: { ...state.show, data, fetching: false, error: null}})
export const showInvoiceFailure = (state, { error }) =>
  state.merge({ ...state, show: { ...state.show, fetching: false, error}})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_INVOICE_REQUEST]: getInvoiceRequest,
  [Types.GET_INVOICE_SUCCESS]: getInvoiceSuccess,
  [Types.GET_INVOICE_FAILURE]: getInvoiceFailure,

  [Types.MORE_INVOICE_REQUEST]: moreInvoiceRequest,
  [Types.MORE_INVOICE_SUCCESS]: moreInvoiceSuccess,
  [Types.MORE_INVOICE_FAILURE]: moreInvoiceFailure,

  [Types.SHOW_INVOICE_REQUEST]: showInvoiceRequest,
  [Types.SHOW_INVOICE_SUCCESS]: showInvoiceSuccess,
  [Types.SHOW_INVOICE_FAILURE]: showInvoiceFailure,
})
