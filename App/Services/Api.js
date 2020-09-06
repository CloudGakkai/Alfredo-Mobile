// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const headers = {
  'ContentType': 'application/json',
  'Authorization': 'Token d5a705c1031abd1e977ff66de201a6e18/s11wXOvp6SkWXVbp/PxUVjIIy99jx+saeF3eqsGauI+0hJ2NKrNMLO/GCkBCk/'
}

// our "constructor"
const create = (baseURL = 'https://api.alfredo.my.id/api/v1') => {

  const api = apisauce.create({
    baseURL,
    headers,
    timeout: 10000
  })

  // auth
  const authLogin = data => api.post(`/account/sign-in`, data)
  const authRegister = data => api.post(`/account/sign-up`, data)

  // product
  const getProducts = data => api.get(`/products${data.params}`)
  const getDetail = data => api.get(`/products${data}`)

  // category
  const getCategory = data => api.get(`/category`)

  // profile
  const getProfile = data => api.get(`account/profile`)

  return {
    // auth
    authLogin,
    authRegister,

    // product
    getProducts,
    getDetail,

    // category
    getCategory,

    // profile
    getProfile,

    api,
    headers
  }
}

export default {
  create
}
