import { call, put } from 'redux-saga/effects'
import CategoryActions from '../Redux/CategoryRedux'

export function * getCategory (api, action) {
  const { data } = action
  const response = yield call(api.getCategory, data)

  if (response.ok) {
    yield put(CategoryActions.getCategorySuccess(response.data.data))
  } else {
    yield put(CategoryActions.getCategoryFailure(response))
  }
}

export function * showCategory (api, action) {
  const { data } = action
  const response = yield call(api.showCategory, data)

  if (response.ok) {
    yield put(CategoryActions.showCategorySuccess(response.data.data.data))
  } else {
    yield put(CategoryActions.showCategoryFailure(response))
  }
}