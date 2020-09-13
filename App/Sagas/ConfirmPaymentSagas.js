import { call, put } from 'redux-saga/effects'
import ConfirmPaymentActions from '../Redux/ConfirmPaymentRedux'
import { Alert } from 'react-native '

export function * confirmPayment (api, action) {
  const { data } = action
  const response = yield call(api.confirm, data)

  if (response.ok) {
    yield put(ConfirmPaymentActions.confirmPaymentSuccess(response.data.data))
    Alert.alert('Sukses', 'Order anda akan diproses segera')
  } else {
    yield put(ConfirmPaymentActions.confirmPaymentFailure(response))
    Alert.alert('Gagal', response?.data?.data?.message)
  }
}
