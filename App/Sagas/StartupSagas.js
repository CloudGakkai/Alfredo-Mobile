import { put, select } from 'redux-saga/effects'
import SessionActions, { SessionSelectors } from '../Redux/SessionRedux'
import { is } from 'ramda'
import SessionsActions from '../Redux/SessionRedux'

// process STARTUP actions
export function * startup (api, action) {
  const user = yield select(SessionSelectors.selectUser)
  if (user) {
    api.api.setHeaders({
      'X-AUTH-TOKEN': `Bearer ${user.token}`
    })

    yield put(SessionsActions.getProfileRequest())
  }
}
