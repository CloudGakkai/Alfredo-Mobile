import { call, put } from 'redux-saga/effects'
import InvoiceActions from '../Redux/InvoiceRedux'

export function * showInvoice (api, action) {
  const { data } = action
  const response = yield call(api.showInvoice, data)

  if (response.ok) {
    yield put(InvoiceActions.showInvoiceSuccess(response.data.data))
  } else {
    yield put(InvoiceActions.showInvoiceFailure(response))
  }
}
