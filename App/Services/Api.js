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

  const getProducts = data => api.get(`/products${data.params}`)
  const getCategory = data => api.get(`/category`)
  const getDetail = data => api.get(`/products/${data}`)

  return {
    getProducts,
    getCategory,
    
    api
  }
}

export default {
  create
}
