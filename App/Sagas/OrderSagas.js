import { call, put } from 'redux-saga/effects'
import OrderActions from '../Redux/OrderRedux'
import NavigationServices from '../Services/NavigationServices'
import Toast from 'react-native-simple-toast'

export function * makeOrder (api, action) {
  const { data } = action
  const response = yield call(api.makeOrder, data)

  if (response.ok) {
    yield put(OrderActions.makeOrderSuccess(response.data.data))
    Toast.show('Order Success', Toast.SHORT)
    NavigationServices.navigate('Invoice', { inv: response?.data?.data?.invoice_id })
  } else {
    yield put(OrderActions.makeOrderFailure(response))
  }
}