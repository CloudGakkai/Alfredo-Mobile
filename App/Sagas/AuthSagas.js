import { call, put, all } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import SessionsActions from '../Redux/SessionRedux'
import NavigationServices from '../Services/NavigationServices'
import Toast from 'react-native-simple-toast'

export function * doLogin(api, action) {
  const { data } = action
  const response = yield call(api.authLogin, data)

  if(response.ok) {
    api.api.setHeaders({
      "X-AUTH-TOKEN": `Bearer ${response.data.data.token}`
    })

    yield all([
      yield put(AuthActions.doLoginSuccess(response.data.data)),
      yield put(SessionsActions.saveSession(response.data.data)),
      yield put(SessionsActions.getProfileRequest())
    ])

    Toast.show("Login Successfully!", Toast.SHORT)

    if (data.event === null) {
      NavigationServices.goBack()
    } else {
      NavigationServices.goBack()
      data.event()
    }
  } else {
    yield put(AuthActions.doLoginFailure(response))
    Toast.show(response?.data?.data?.message ?? "Internal Server Error", Toast.SHORT)
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
      yield put(SessionsActions.saveSession(response.data.data)),
      yield put(SessionsActions.getProfileRequest())
    ])

    Toast.show("Register Successfully!", Toast.SHORT)

    if (data.event === null) {
      NavigationServices.goBack()
    } else {
      NavigationServices.goBack()
      data.event()
    }
  } else {
    yield put(AuthActions.doRegisterFailure(response))
    Toast.show(response?.data?.data?.message ?? "Internal Server Error", Toast.SHORT)
  }
}

export function * doLogout(api, action) {
  api.api.setHeaders(api.headers)

  yield all([
    yield put(SessionsActions.clearSession()),
    yield put(AuthActions.doLogoutSuccess("Logout Success"))
  ])

  Toast.show("Logout Successfully!", Toast.SHORT)
}
