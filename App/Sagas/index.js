import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { ProductsTypes } from "../Redux/ProductsRedux"
import { CategoryTypes } from "../Redux/CategoryRedux"
import { SessionTypes } from '../Redux/SessionRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { InvoiceTypes } from '../Redux/InvoiceRedux'
import { OrderTypes } from '../Redux/OrderRedux'
import { ConfirmPaymentTypes } from '../Redux/ConfirmPaymentRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getProducts, moreProducts, getDetail } from "./ProductsSagas"
import { getCategory, showCategory } from "./CategorySagas"
import { doLogin, doRegister, doLogout } from './AuthSagas'
import { getProfile } from './SessionSagas'
import { getInvoice, moreInvoice, showInvoice } from './InvoiceSagas'
import { makeOrder } from './OrderSagas'
import { confirmPayment } from './ConfirmPaymentSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),

    takeLatest(ProductsTypes.GET_PRODUCTS_REQUEST, getProducts, api),
    takeLatest(ProductsTypes.MORE_PRODUCTS_REQUEST, moreProducts, api),
    takeLatest(ProductsTypes.GET_DETAIL_REQUEST, getDetail, api),

    takeLatest(CategoryTypes.GET_CATEGORY_REQUEST, getCategory, api),
    takeLatest(CategoryTypes.SHOW_CATEGORY_REQUEST, showCategory, api),

    takeLatest(AuthTypes.DO_LOGIN_REQUEST, doLogin, api),
    takeLatest(AuthTypes.DO_REGISTER_REQUEST, doRegister, api),
    takeLatest(AuthTypes.DO_LOGOUT_REQUEST, doLogout, api),

    takeLatest(SessionTypes.GET_PROFILE_REQUEST, getProfile, api),

    takeLatest(InvoiceTypes.GET_INVOICE_REQUEST, getInvoice, api),
    takeLatest(InvoiceTypes.MORE_INVOICE_REQUEST, moreInvoice, api),
    takeLatest(InvoiceTypes.SHOW_INVOICE_REQUEST, showInvoice, api),

    takeLatest(OrderTypes.MAKE_ORDER_REQUEST, makeOrder, api),

    takeLatest(ConfirmPaymentTypes.CONFIRM_PAYMENT_REQUEST, confirmPayment, api)
  ])
}
