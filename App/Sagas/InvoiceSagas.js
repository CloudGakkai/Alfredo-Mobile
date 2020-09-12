import { call, put } from 'redux-saga/effects'
import InvoiceActions from '../Redux/InvoiceRedux'

export function * getInvoice(api, action) {
  const { data } = action
  const response = yield call(api.getInvoice, data)

  if(response.ok) {
    yield put(InvoiceActions.getInvoiceSuccess({
      data: response.data.data.data,
      lastPage: response.data.data.lastPage
    }))
  } else {
    yield put(InvoiceActions.getInvoiceFailure(response))
  }
}

export function * moreInvoice(api, action) {
  const { data } = action
  const response = yield call(api.getInvoice, data)

  if(response.ok) {
    yield put(InvoiceActions.moreInvoiceSuccess({
      data: response.data.data.data,
      page: data.page
    }))
  } else {
    yield put(InvoiceActions.moreInvoiceFailure(response))
  }
}

export function * showInvoice (api, action) {
  const { data } = action
  const response = yield call(api.showInvoice, data)

  if (response.ok) {
    yield put(InvoiceActions.showInvoiceSuccess(response.data.data))
  } else {
    yield put(InvoiceActions.showInvoiceFailure(response))
  }
}
