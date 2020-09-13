import { call, put } from 'redux-saga/effects'
import ConfirmPaymentActions from '../Redux/ConfirmPaymentRedux'
import Toast from 'react-native-simple-toast'
import NavigationServices from '../Services/NavigationServices'

export function * confirmPayment (api, action) {
  const { data } = action
  const response = yield call(api.confirm, data)

  if (response.ok) {
    yield put(ConfirmPaymentActions.confirmPaymentSuccess(response.data.data))
    Toast.show('Order anda akan diproses segera', Toast.LONG)
    NavigationServices.pop(2)
  } else {
    yield put(ConfirmPaymentActions.confirmPaymentFailure(response))
    Toast.show(response?.data?.data?.message ?? "Internal Server Error.", Toast.LONG)
  }
}
