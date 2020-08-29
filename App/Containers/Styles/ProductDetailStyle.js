import { connect } from '../../Lib/OsmiProvider'

export default connect({
  loading: 'flex justify-center items-center',
  content: 'flex-start bg-gray-500',
  detailSec: 'px-2 mx-3 rounded-md my-2 py-2 bg-white',
  price: 'text-2xl font-bold',
  title: 'text-lg text-black',
  stock: 'text-gray-700',
  descSec: 'px-2 mx-3 mb-2 rounded-md bg-white',
  descTitle: 'my-1 font-bold text-base text-black mt-2',
  desc: 'mb-2',
  footer: 'row px-5 pt-1 border-t border-gray-400 items-center',
  qty: 'flex-2 row items-center mr-3',
  qtyLabel: 'text-base font-bold text-vertical-center',
  qtyInputGroup: '',
  btnQty: 'px-4 py-2 mx-1 rounded-md bg-gray-300',
  qtyInput: 'text-center flex',
  btnBuy: 'justify-center items-center flex rounded-md bg-blue-500 px-5 py-2',
  btnBuyLabel: 'text-white font-bold text-base font-bold'
})