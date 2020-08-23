import { call, put } from 'redux-saga/effects'
import CategoryActions from '../Redux/CategoryRedux'

export function * getCategory (api, action) {
  const { data } = action
  const response = yield call(api.getCategory, data)

  if (response.ok) {
    console.tron.log("=== titid ===", response)
    yield put(CategoryActions.getCategorySuccess(response.data.data))
  } else {
    yield put(CategoryActions.getCategoryFailure(response))
  }
}
