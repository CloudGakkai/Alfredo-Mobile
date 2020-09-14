import { connect } from '../../Lib/OsmiProvider'

export default connect({
  loading: 'flex justify-center items-center',
  content: 'flex-start bg-gray-100',
  detailSec: 'px-2 mb-3 py-2 bg-white shadow-md',
  price: 'text-2xl font-bold',
  title: 'text-lg text-black',
  stock: 'text-gray-700',
  descSec: 'px-2 mb-16 bg-white shadow-md',
  descTitle: 'my-1 font-bold text-base text-black mt-2',
  desc: 'mb-2',
  footer: 'absolute bottom-0 z-10 row px-5 pt-1 shadow-lg items-center bg-white',
  iosFooter: 'ml-3 mr-3 rounded-md row px-5 pt-3 pb-3 shadow-lg items-center bg-white',
  qty: 'flex-2 row items-center mr-3',
  qtyLabel: 'text-base font-bold text-vertical-center',
  qtyInputGroup: '',
  btnQty: 'px-4 py-2 mx-1 rounded-md bg-gray-300',
  qtyInput: 'text-center flex',
  btnBuy: 'justify-center items-center flex rounded-md bg-blue-500 px-5 py-2',
  btnBuyLabel: 'text-white font-bold text-base font-bold'
})
