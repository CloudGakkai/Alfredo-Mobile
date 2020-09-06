import { call, put } from 'redux-saga/effects'
import SessionActions from '../Redux/SessionRedux'

export function * getProfile(api, action) {
  const { data } = action
  const response = yield call(api.getProfile, data)

  if (response.ok) {
    yield put(SessionActions.getProfileSuccess(response.data.data))
  } else {
    yield put(SessionActions.getProfileFailure(response))
  }
}
