import { call, put } from 'redux-saga/effects'
import ConfirmPaymentActions from '../Redux/ConfirmPaymentRedux'

export function * getConfirmPayment (api, action) {
  const { data } = action
  const response = yield call(api.getconfirmPayment, data)

  if (response.ok) {
    yield put(ConfirmPaymentActions.confirmPaymentSuccess(response.data))
  } else {
    yield put(ConfirmPaymentActions.confirmPaymentFailure())
  }
}
