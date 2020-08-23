import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { ProductsTypes } from "../Redux/ProductsRedux"
import { CategoryTypes } from "../Redux/CategoryRedux"

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getProducts, moreProducts } from "./ProductsSagas"
import { getCategory } from "./CategorySagas";

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(ProductsTypes.GET_PRODUCTS_REQUEST, getProducts, api),
    takeLatest(ProductsTypes.MORE_PRODUCTS_REQUEST, moreProducts, api),
    takeLatest(CategoryTypes.GET_CATEGORY_REQUEST, getCategory, api)
  ])
}
