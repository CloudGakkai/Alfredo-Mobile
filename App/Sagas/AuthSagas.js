import { call, put, all } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import SessionsActions from '../Redux/SessionRedux'
import NavigationServices from '../Services/NavigationServices'

export function * doLogin(api, action) {
  const { data } = action
  const response = yield call(api.authLogin, data)

  if(response.ok) {
    api.api.setHeaders({
      "X-AUTH-TOKEN": `Bearer ${response.data.data.token}`
    })

    yield all([
      yield put(AuthActions.doLoginSuccess(response.data.data)),
      yield put(SessionsActions.saveSession(response.data.data))
    ])

    if (data.event) {
      data.event()
    } else {
      NavigationServices.goBack()
    }
  } else {
    yield put(AuthActions.doLoginFailure(response))
    alert(response?.data?.data?.message ?? "Internal Server Error")
  }
}

export function * doRegister(api, action) {
  const { data } = action
  const response = yield call(api.authRegister, data)

  if(response.ok) {
    api.api.setHeaders({
      "X-AUTH-TOKEN": `Bearer ${response.data.data.token}`
    })
    yield all([
      yield put(AuthActions.doRegisterSuccess(response.data.data)),
      yield put(SessionsActions.saveSession(response.data.data))
    ])
    
    if (data.event) {
      data.event()
    } else {
      NavigationServices.pop(2)
    }
  } else {
    yield put(AuthActions.doRegisterFailure(response))
    alert(response?.data?.data?.message ?? "Internal Server Error")
  }
}

export function * doLogout(api, action) {
  yield all([
    yield put(SessionsActions.clearSession()),
    yield put(AuthActions.doLogoutSuccess("Logout Success"))
  ])
}